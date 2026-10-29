import {
  OrganizationUuidVo,
  OrganizationMemberRoleVo,
  OrganizationInvitationUuidVo,
} from '$modules/organization/domain';
import { UserEmailVo, UserUuidVo } from '$modules/user/domain';

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
  public readonly organizationId: OrganizationUuidVo;
  public readonly inviterUserId: UserUuidVo;
  public readonly invitee: {
    invitationId: OrganizationInvitationUuidVo;
    email: UserEmailVo;
    role: OrganizationMemberRoleVo;
  };

  constructor(input: CreateInvitationInput) {
    this.organizationId = OrganizationUuidVo.create(input.organizationId);
    this.inviterUserId = UserUuidVo.create(input.inviterUserId);
    this.invitee = {
      invitationId: OrganizationInvitationUuidVo.generate(),
      email: UserEmailVo.create(input.invitee.email),
      role: OrganizationMemberRoleVo.create(input.invitee.role),
    };
  }
}
