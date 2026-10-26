import {
  OrganizationInvitationStatusVo,
  OrganizationInvitationUuidVo,
} from '$modules/organization/domain';
import { UserUuidVo } from '$modules/user/domain';

import type { OrganizationInvitationStatusValue } from '$modules/organization/domain';

export interface ChangeInvitationStatusInput {
  userId: string;
  organizationInvitationId: string;
  status: OrganizationInvitationStatusValue;
}

export class ChangeInvitationStatusCommand {
  public readonly userId: UserUuidVo;
  public readonly organizationInvitationId: OrganizationInvitationUuidVo;
  public readonly status: OrganizationInvitationStatusVo;

  constructor(input: ChangeInvitationStatusInput) {
    this.userId = UserUuidVo.create(input.userId);
    this.organizationInvitationId = OrganizationInvitationUuidVo.create(
      input.organizationInvitationId,
    );
    this.status = OrganizationInvitationStatusVo.create(input.status);
  }
}
