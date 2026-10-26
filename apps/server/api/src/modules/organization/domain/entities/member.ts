import { Entity } from '$shared/ddd';

import type { UserUuidVo } from '$modules/user/domain';
import type {
  OrganizationMemberRoleVo,
  OrganizationMemberRoleValue,
} from '../value-objects/member-role';
import type { OrganizationMemberUuidVo } from '../value-objects/member-uuid';
import type { OrganizationUuidVo } from '../value-objects/uuid';

interface Props {
  organizationId: OrganizationUuidVo;
  userId: UserUuidVo;
  role: OrganizationMemberRoleVo;
}

interface Snapshot {
  id: string;
  organizationId: string;
  userId: string;
  role: OrganizationMemberRoleValue;
}

export class OrganizationMemberEntity extends Entity<
  OrganizationMemberUuidVo,
  Snapshot
> {
  private props: Props;

  private constructor(id: OrganizationMemberUuidVo, props: Props) {
    super(id);
    this.props = { ...props };
  }

  static create(id: OrganizationMemberUuidVo, props: Props) {
    return new OrganizationMemberEntity(id, props);
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
