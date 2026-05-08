import { OrganizationMember } from '$modules/organization/domain/entities/organization-member.entity';
import { OrganizationCreatededEvent } from '$modules/organization/domain/events/organization-createded.event';
import { OrganizationMembersAddedEvent } from '$modules/organization/domain/events/organization-members-added.event';
import { OrganizationMemberUuid } from '$modules/organization/domain/value-objects/organization-member-uuid.vo';
import { OrganizationAccessDenied } from '$modules/organization/errors/access-denied.error';
import { DuplicateOrganizationMember } from '$modules/organization/errors/duplicate-organization-member.error';
import { MinMemberConstraint } from '$modules/organization/errors/min-member-constraint.error';
import { OrganizationAdminLimitExceeded } from '$modules/organization/errors/organization-admin-limit-exceeded.error';
import { OrganizationAdminRequirement } from '$modules/organization/errors/organization-admin-requirement.error';
import { OrganizationTitleEmpty } from '$modules/organization/errors/organization-title-empty.error';
import { UnaffiliatedMember } from '$modules/organization/errors/unaffiliated_member.error';
import { AggregateRoot } from '$shared/ddd/entity/aggregate-root.abstract';

import type { OrganizationMemberRole } from '$modules/organization/domain/entities/organization-member.entity';
import type { OrganizationUuid } from '$modules/organization/domain/value-objects/organization-uuid.vo';
import type { UserUuid } from '$modules/user/domain/value-objects/uuid.vo';

interface OrganizationProps {
  title: string;
}

export class Organization extends AggregateRoot<OrganizationUuid> {
  private members: OrganizationMember[] = [];
  private props: OrganizationProps;

  private constructor(
    id: OrganizationUuid,
    props: OrganizationProps,
    members: OrganizationMember[],
  ) {
    super(id);

    this.validateTitle(props.title);
    this.validateInitialMembers(id, members);

    this.props = { ...props };
    this.members = [...members];
  }

  static create(
    id: OrganizationUuid,
    props: OrganizationProps,
    members: OrganizationMember[],
  ): Organization {
    const organization = new Organization(id, props, members);

    organization.addDomainEvent(
      new OrganizationCreatededEvent(organization.id, organization.title),
    );
    organization.addDomainEvent(
      new OrganizationMembersAddedEvent(organization.id, organization.members),
    );

    return organization;
  }

  static reconstruct(
    id: OrganizationUuid,
    props: OrganizationProps,
    members: OrganizationMember[],
  ) {
    return new Organization(id, props, members);
  }

  private validateTitle(title: string): void {
    const trimmed = title.trim();

    if (!trimmed) {
      throw new OrganizationTitleEmpty(Organization.name);
    }
  }

  private validateInitialMembers(
    organizationId: OrganizationUuid,
    members: OrganizationMember[],
  ): void {
    if (members.length === 0) {
      throw new MinMemberConstraint(Organization.name);
    }

    for (const member of members) {
      if (!member.organizationId.equals(organizationId)) {
        throw new UnaffiliatedMember(Organization.name);
      }
    }

    const uniqueUserIds = new Set(
      members.map((member) => member.userId.getValue()),
    );

    if (uniqueUserIds.size !== members.length) {
      throw new DuplicateOrganizationMember(Organization.name);
    }

    const adminUser = members.filter((member) => member.role === 'ADMIN');

    if (adminUser.length === 0) {
      throw new OrganizationAdminRequirement(Organization.name);
    }

    if (adminUser.length > 1) {
      throw new OrganizationAdminLimitExceeded(Organization.name);
    }
  }

  private validateDuplicateEntries(
    entries: { userId: UserUuid; role: OrganizationMemberRole }[],
  ): void {
    const uniqueUserIds = new Set(
      entries.map((entry) => entry.userId.getValue()),
    );

    if (uniqueUserIds.size !== entries.length) {
      throw new DuplicateOrganizationMember(Organization.name);
    }
  }

  addMember(
    executorUserId: UserUuid,
    entries: { userId: UserUuid; role: OrganizationMemberRole }[],
  ): void {
    this.validateDuplicateEntries(entries);

    const executor = this.members.find((member) =>
      member.userId.equals(executorUserId),
    );

    if (!executor) {
      throw new Error('조직에 속한 멤버만 추가 가능');
    }

    if (!executor.organizationId.equals(super.id)) {
      /**
       * 위 조건이랑 중복인 검증
       * 의도치 않은 데이터 방지 위해 유지
       */
      throw new UnaffiliatedMember(Organization.name);
    }

    if (!executor.canAddMember()) {
      throw new OrganizationAccessDenied(Organization.name);
    }

    const newMembers = entries.map((entry) => {
      if (this.hasMember(entry.userId)) {
        throw new DuplicateOrganizationMember(Organization.name);
      }

      return OrganizationMember.create(OrganizationMemberUuid.generate(), {
        userId: entry.userId,
        organizationId: this.id,
        role: entry.role,
      });
    });

    this.members = [...this.members, ...newMembers];

    this.addDomainEvent(new OrganizationMembersAddedEvent(this.id, newMembers));
  }

  hasMember(userId: UserUuid): boolean {
    return this.members.some((member) => member.userId.equals(userId));
  }

  getAdmin(): OrganizationMember | null {
    return this.members.find((member) => member.role === 'ADMIN') ?? null;
  }

  getMembers() {
    return [...this.members];
  }

  get title() {
    return this.props.title;
  }
}
