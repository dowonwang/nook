import { OrganizationUuid } from '$modules/organization/domain';
import { UserUuid } from '$modules/user/domain';

export interface FindSentInvitationsInput {
  organizationId: string;
  userId: string;
}

export class FindSentInvitationsQuery {
  public readonly organizationId: OrganizationUuid;
  public readonly userId: UserUuid;

  constructor(input: FindSentInvitationsInput) {
    this.organizationId = OrganizationUuid.create(input.organizationId);
    this.userId = UserUuid.create(input.userId);
  }
}
