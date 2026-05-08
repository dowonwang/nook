import { Entity } from '$shared/ddd/entity/entity.abstract';

import type { OrganizationMemberUuid } from '$modules/organization/domain/value-objects/organization-member-uuid.vo';
import type { OrganizationUuid } from '$modules/organization/domain/value-objects/organization-uuid.vo';
import type { UserUuid } from '$modules/user/domain/value-objects/uuid.vo';

export type OrganizationMemberRole = 'ADMIN' | 'MAINTAINER' | 'MEMBER';

interface OrganizationMemberProps {
  organizationId: OrganizationUuid;
  userId: UserUuid;
  role: OrganizationMemberRole;
}

export class OrganizationMember extends Entity<OrganizationMemberUuid> {
  private props: OrganizationMemberProps;

  private constructor(
    id: OrganizationMemberUuid,
    props: OrganizationMemberProps,
  ) {
    super(id);
    this.props = { ...props };
  }

  static create(id: OrganizationMemberUuid, props: OrganizationMemberProps) {
    return new OrganizationMember(id, props);
  }

  canAddMember(): boolean {
    const allowRole: OrganizationMemberRole[] = ['ADMIN', 'MAINTAINER'];

    return allowRole.includes(this.props.role);
  }

  get userId() {
    return this.props.userId;
  }

  get role() {
    return this.props.role;
  }

  get organizationId() {
    return this.props.organizationId;
  }
}
