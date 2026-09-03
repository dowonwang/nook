import {
  OrganizationInvitationStatus,
  OrganizationInvitationUuid,
} from '$modules/organization/domain';
import { UserUuid } from '$modules/user/domain';

import type { OrganizationInvitationStatusValue } from '$modules/organization/domain';

export interface ChangeInvitationStatusInput {
  userId: string;
  organizationInvitationId: string;
  status: OrganizationInvitationStatusValue;
}

export class ChangeInvitationStatusCommand {
  public readonly userId: UserUuid;
  public readonly organizationInvitationId: OrganizationInvitationUuid;
  public readonly status: OrganizationInvitationStatus;

  constructor(input: ChangeInvitationStatusInput) {
    this.userId = UserUuid.create(input.userId);
    this.organizationInvitationId = OrganizationInvitationUuid.create(
      input.organizationInvitationId,
    );
    this.status = OrganizationInvitationStatus.create(input.status);
  }
}
