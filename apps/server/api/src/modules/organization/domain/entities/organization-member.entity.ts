import { Entity } from '$shared/ddd';

import type { UserUuid } from '$modules/user/domain';
import type {
  OrganizationMemberRole,
  OrganizationMemberRoleValue,
} from '../value-objects/organization-member-role.vo';
import type { OrganizationMemberUuid } from '../value-objects/organization-member-uuid.vo';
import type { OrganizationUuid } from '../value-objects/organization-uuid.vo';

interface Props {
  organizationId: OrganizationUuid;
  userId: UserUuid;
  role: OrganizationMemberRole;
}

interface Snapshot {
  id: string;
  organizationId: string;
  userId: string;
  role: OrganizationMemberRoleValue;
}

export class OrganizationMember extends Entity<
  OrganizationMemberUuid,
  Snapshot
> {
  private props: Props;

  private constructor(id: OrganizationMemberUuid, props: Props) {
    super(id);
    this.props = { ...props };
  }

  static create(id: OrganizationMemberUuid, props: Props) {
    return new OrganizationMember(id, props);
  }

  toSnapshot(): Readonly<Snapshot> {
    return Object.freeze({
      id: this.id.getValue(),
      organizationId: this.props.organizationId.getValue(),
      userId: this.props.userId.getValue(),
      role: this.props.role.getValue(),
    });
  }

  canAddMember(): boolean {
    return this.props.role.canAddMember();
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
