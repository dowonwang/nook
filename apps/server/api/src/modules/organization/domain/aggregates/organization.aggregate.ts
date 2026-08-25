import {
  DuplicateOrganizationMember,
  MinMemberConstraint,
  OrganizationAdminLimitExceeded,
  OrganizationAdminRequirement,
  OrganizationTitleEmpty,
  UnaffiliatedMember,
} from '$modules/organization/error';
import { AggregateRoot } from '$shared/ddd';

import { OrganizationMember } from '../entities/organization-member.entity';
import { OrganizationCreatedEvent } from '../events/organization-created.event';
import { OrganizationMembersAddedEvent } from '../events/organization-members-added.event';
import { OrganizationMemberUuid } from '../value-objects/organization-member-uuid.vo';

import type { UserUuid } from '$modules/user/domain';
import type { OrganizationMemberRole } from '../value-objects/organization-member-role.vo';
import type { OrganizationUuid } from '../value-objects/organization-uuid.vo';

interface Props {
  title: string;
}

interface Snapshot {
  id: string;
  title: string;
}

export class Organization extends AggregateRoot<OrganizationUuid, Snapshot> {
  private members: OrganizationMember[] = [];
  private props: Props;

  private constructor(
    id: OrganizationUuid,
    props: Props,
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
    props: Props,
    members: OrganizationMember[],
  ): Organization {
    const organization = new Organization(id, props, members);

    organization.addDomainEvent(
      new OrganizationCreatedEvent(organization.id, organization.title),
    );
    organization.addDomainEvent(
      new OrganizationMembersAddedEvent(organization.id, organization.members),
    );

    return organization;
  }

  static reconstruct(
    id: OrganizationUuid,
    props: Props,
    members: OrganizationMember[],
  ) {
    return new Organization(id, props, members);
  }

  toSnapshot(): Readonly<Snapshot> {
    return Object.freeze({
      id: this.id.getValue(),
      title: this.props.title,
    });
  }

  // vo로 빼는 것도 고려
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

    const adminUser = members.filter(
      (member) => member.role.getValue() === 'ADMIN',
    );

    if (adminUser.length === 0) {
      throw new OrganizationAdminRequirement(Organization.name);
    }

    if (adminUser.length > 1) {
      throw new OrganizationAdminLimitExceeded(Organization.name);
    }
  }

  addMemberFromInvitation(userId: UserUuid, role: OrganizationMemberRole) {
    if (this.hasMember(userId)) {
      throw new DuplicateOrganizationMember(Organization.name);
    }

    const member = OrganizationMember.create(
      OrganizationMemberUuid.generate(),
      {
        organizationId: this.id,
        userId,
        role,
      },
    );

    this.members.push(member);

    this.addDomainEvent(new OrganizationMembersAddedEvent(this.id, [member]));
  }

  hasMember(userId: UserUuid): boolean {
    return this.members.some((member) => member.userId.equals(userId));
  }

  getMember(id: OrganizationMemberUuid): OrganizationMember | null {
    return this.members.find((member) => member.userId.equals(id)) || null;
  }

  getMemberCount(): number {
    return this.members.length;
  }

  get title() {
    return this.props.title;
  }
}
