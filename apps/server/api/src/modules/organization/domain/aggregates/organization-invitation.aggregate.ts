import { AggregateRoot } from '$shared/ddd';

import { OrganizationInvitationStatus } from '../value-objects/organization-invitation-status.vo';

import type { UserUuid } from '$modules/user/domain';
import type { OrganizationInvitationStatusValue } from '../value-objects/organization-invitation-status.vo';
import type { OrganizationInvitationUuid } from '../value-objects/organization-invitation-uuid.vo';
import type {
  OrganizationMemberRole,
  OrganizationMemberRoleValue,
} from '../value-objects/organization-member-role.vo';
import type { OrganizationUuid } from '../value-objects/organization-uuid.vo';

interface Attributes {
  expiresAt: Date;
}

interface Props extends Attributes {
  organizationId: OrganizationUuid;
  inviteeUserId: UserUuid;
  invitedByUserId: UserUuid;
  role: OrganizationMemberRole;
  status: OrganizationInvitationStatus;
}

interface Snapshot extends Attributes {
  id: string;
  organizationId: string;
  inviteeUserId: string;
  invitedByUserId: string;
  role: OrganizationMemberRoleValue;
  status: OrganizationInvitationStatusValue;
}

export class OrganizationInvitation extends AggregateRoot<
  OrganizationInvitationUuid,
  Snapshot
> {
  private props: Props;

  private constructor(id: OrganizationInvitationUuid, props: Props) {
    super(id);

    this.props = {
      ...props,
      expiresAt: new Date(props.expiresAt),
    };
  }

  static create(
    id: OrganizationInvitationUuid,
    props: Omit<Props, 'status'>,
  ): OrganizationInvitation {
    const invitation = new OrganizationInvitation(id, {
      ...props,
      status: OrganizationInvitationStatus.create('PENDING'),
    });

    return invitation;
  }

  static reconstruct(
    id: OrganizationUuid,
    props: Props,
  ): OrganizationInvitation {
    return new OrganizationInvitation(id, props);
  }

  toSnapshot(): Readonly<Snapshot> {
    return Object.freeze({
      id: this.id.getValue(),
      organizationId: this.props.organizationId.getValue(),
      inviteeUserId: this.props.inviteeUserId.getValue(),
      invitedByUserId: this.props.invitedByUserId.getValue(),
      role: this.props.role.getValue(),
      status: this.props.status.getValue(),
      expiresAt: new Date(this.props.expiresAt),
    });
  }

  get inviteeUserId(): UserUuid {
    return this.props.inviteeUserId;
  }

  get invitedByUserId(): UserUuid {
    return this.props.invitedByUserId;
  }
}
