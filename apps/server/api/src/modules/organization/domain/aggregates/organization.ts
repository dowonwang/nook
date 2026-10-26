import {
  DuplicateOrganizationMemberError,
  OrganizationMinMemberConstraintError,
  OrganizationAdminRequirementError,
  OrganizationTitleEmptyError,
  OrganizationUnaffiliatedMemberError,
} from '$modules/organization/error';
import { AggregateRoot } from '$shared/ddd';

import { OrganizationMemberEntity } from '../entities/member';
import { OrganizationCreatedEvent } from '../events/created';
import { OrganizationMembersAddedEvent } from '../events/members-added';
import { OrganizationMemberUuidVo } from '../value-objects/member-uuid';

import type { UserUuidVo } from '$modules/user/domain';
import type { OrganizationMemberRoleVo } from '../value-objects/member-role';
import type { OrganizationUuidVo } from '../value-objects/uuid';

interface Props {
  title: string;
}

interface Snapshot {
  id: string;
  title: string;
}

export class OrganizationAggregate extends AggregateRoot<
  OrganizationUuidVo,
  Snapshot
> {
  private members: OrganizationMemberEntity[] = [];
  private props: Props;

  private constructor(
    id: OrganizationUuidVo,
    props: Props,
    members: OrganizationMemberEntity[],
  ) {
    super(id);

    this.validateTitle(props.title);
    this.validateInitialMembers(id, members);

    this.props = { ...props };
    this.members = [...members];
  }

  static create(
    id: OrganizationUuidVo,
    props: Props,
    members: OrganizationMemberEntity[],
  ): OrganizationAggregate {
    const organization = new OrganizationAggregate(id, props, members);

    organization.addDomainEvent(
      new OrganizationCreatedEvent(organization.id, organization.title),
    );
    organization.addDomainEvent(
      new OrganizationMembersAddedEvent(organization.id, organization.members),
    );

    return organization;
  }

  static reconstruct(
    id: OrganizationUuidVo,
    props: Props,
    members: OrganizationMemberEntity[],
  ) {
    return new OrganizationAggregate(id, props, members);
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
      throw new OrganizationTitleEmptyError(OrganizationAggregate.name);
    }
  }

  private validateInitialMembers(
    organizationId: OrganizationUuidVo,
    members: OrganizationMemberEntity[],
  ): void {
    if (members.length === 0) {
      throw new OrganizationMinMemberConstraintError(
        OrganizationAggregate.name,
      );
    }

    for (const member of members) {
      if (!member.organizationId.equals(organizationId)) {
        throw new OrganizationUnaffiliatedMemberError(
          OrganizationAggregate.name,
        );
      }
    }

    const uniqueUserIds = new Set(
      members.map((member) => member.userId.getValue()),
    );

    if (uniqueUserIds.size !== members.length) {
      throw new DuplicateOrganizationMemberError(OrganizationAggregate.name);
    }

    const adminUser = members.filter(
      (member) => member.role.getValue() === 'ADMIN',
    );

    if (adminUser.length === 0) {
      throw new OrganizationAdminRequirementError(OrganizationAggregate.name);
    }
  }

  addMemberFromInvitation(userId: UserUuidVo, role: OrganizationMemberRoleVo) {
    if (this.hasMember(userId)) {
      throw new DuplicateOrganizationMemberError(OrganizationAggregate.name);
    }

    const member = OrganizationMemberEntity.create(
      OrganizationMemberUuidVo.generate(),
      {
        organizationId: this.id,
        userId,
        role,
      },
    );

    this.members.push(member);

    this.addDomainEvent(new OrganizationMembersAddedEvent(this.id, [member]));
  }

  hasMember(userId: UserUuidVo): boolean {
    return this.members.some((member) => member.userId.equals(userId));
  }

  getMember(id: OrganizationMemberUuidVo): OrganizationMemberEntity | null {
    return this.members.find((member) => member.userId.equals(id)) || null;
  }

  getMemberCount(): number {
    return this.members.length;
  }

  get title() {
    return this.props.title;
  }
}
