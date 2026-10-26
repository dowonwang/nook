import {
  InvalidOrganizationInvitationStatusError,
  OrganizationInvitationAccessDeniedError,
  OrganizationInvitationExpiredError,
} from '$modules/organization/error';
import { AggregateRoot } from '$shared/ddd';

import { OrganizationInvitationStatusVo } from '../value-objects/invitation-status';

import type { UserUuidVo } from '$modules/user/domain';
import type { OrganizationInvitationStatusValue } from '../value-objects/invitation-status';
import type { OrganizationInvitationUuidVo } from '../value-objects/invitation-uuid';
import type {
  OrganizationMemberRoleVo,
  OrganizationMemberRoleValue,
} from '../value-objects/member-role';
import type { OrganizationUuidVo } from '../value-objects/uuid';

interface Attributes {
  expiresAt: Date;
}

interface Props extends Attributes {
  organizationId: OrganizationUuidVo;
  inviteeUserId: UserUuidVo;
  invitedByUserId: UserUuidVo;
  role: OrganizationMemberRoleVo;
  status: OrganizationInvitationStatusVo;
}

interface Snapshot extends Attributes {
  id: string;
  organizationId: string;
  inviteeUserId: string;
  invitedByUserId: string;
  role: OrganizationMemberRoleValue;
  status: OrganizationInvitationStatusValue;
}

export class OrganizationInvitationAggregate extends AggregateRoot<
  OrganizationInvitationUuidVo,
  Snapshot
> {
  private props: Props;

  private constructor(id: OrganizationInvitationUuidVo, props: Props) {
    super(id);

    this.props = {
      ...props,
      expiresAt: new Date(props.expiresAt),
    };
  }

  static create(
    id: OrganizationInvitationUuidVo,
    props: Omit<Props, 'status'>,
  ): OrganizationInvitationAggregate {
    const invitation = new OrganizationInvitationAggregate(id, {
      ...props,
      status: OrganizationInvitationStatusVo.create('PENDING'),
    });

    return invitation;
  }

  static reconstruct(
    id: OrganizationInvitationUuidVo,
    props: Props,
  ): OrganizationInvitationAggregate {
    return new OrganizationInvitationAggregate(id, props);
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

  accept(userId: UserUuidVo) {
    this.assertPending();
    this.assertExpired();
    this.assertInvitee(userId);

    this.props.status = OrganizationInvitationStatusVo.create('ACCEPTED');
  }

  cancel(userId: UserUuidVo) {
    this.assertPending();
    this.assertExpired();
    this.assertInvitedUser(userId);

    this.props.status = OrganizationInvitationStatusVo.create('CANCELED');
  }

  reject(userId: UserUuidVo) {
    this.assertPending();
    this.assertExpired();
    this.assertInvitee(userId);

    this.props.status = OrganizationInvitationStatusVo.create('REJECTED');
  }

  assertPending(): void {
    if (this.props.status.getValue() !== 'PENDING') {
      throw new InvalidOrganizationInvitationStatusError(
        OrganizationInvitationAggregate.name,
      );
    }
  }

  assertExpired(): void {
    if (this.props.expiresAt.getTime() < Date.now()) {
      throw new OrganizationInvitationExpiredError(
        OrganizationInvitationAggregate.name,
      );
    }
  }

  assertInvitee(userId: UserUuidVo): void {
    if (!this.inviteeUserId.equals(userId)) {
      throw new OrganizationInvitationAccessDeniedError(
        OrganizationInvitationAggregate.name,
      );
    }
  }

  assertInvitedUser(userId: UserUuidVo): void {
    if (!this.invitedByUserId.equals(userId)) {
      throw new OrganizationInvitationAccessDeniedError(
        OrganizationInvitationAggregate.name,
      );
    }
  }

  get inviteeUserId(): UserUuidVo {
    return this.props.inviteeUserId;
  }

  get invitedByUserId(): UserUuidVo {
    return this.props.invitedByUserId;
  }

  get organizationId(): OrganizationUuidVo {
    return this.props.organizationId;
  }

  get role(): OrganizationMemberRoleVo {
    return this.props.role;
  }
}
