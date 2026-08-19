import {
  OrganizationUuid,
  OrganizationMemberRole,
  OrganizationInvitationUuid,
} from '$modules/organization/domain';
import { UserEmail, UserUuid } from '$modules/user/domain';

import type { OrganizationMemberRoleValue } from '$modules/organization/domain';

export interface CreateInvitationInput {
  organizationId: string;
  inviterUserId: string;
  invitee: {
    email: string;
    role: OrganizationMemberRoleValue;
  };
}

export class CreateInvitationCommand {
  public readonly organizationId: OrganizationUuid;
  public readonly inviterUserId: UserUuid;
  public readonly invitee: {
    invitationId: OrganizationInvitationUuid;
    email: UserEmail;
    role: OrganizationMemberRole;
  };

  constructor(input: CreateInvitationInput) {
    this.organizationId = OrganizationUuid.create(input.organizationId);
    this.inviterUserId = UserUuid.create(input.inviterUserId);
    this.invitee = {
      invitationId: OrganizationInvitationUuid.generate(),
      email: UserEmail.create(input.invitee.email),
      role: OrganizationMemberRole.create(input.invitee.role),
    };
  }
}
