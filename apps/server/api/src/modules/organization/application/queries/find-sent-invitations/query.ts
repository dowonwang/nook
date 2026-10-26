import { OrganizationUuidVo } from '$modules/organization/domain';
import { UserUuidVo } from '$modules/user/domain';

export interface FindSentInvitationsInput {
  organizationId: string;
  userId: string;
}

export class FindSentInvitationsQuery {
  public readonly organizationId: OrganizationUuidVo;
  public readonly userId: UserUuidVo;

  constructor(input: FindSentInvitationsInput) {
    this.organizationId = OrganizationUuidVo.create(input.organizationId);
    this.userId = UserUuidVo.create(input.userId);
  }
}
