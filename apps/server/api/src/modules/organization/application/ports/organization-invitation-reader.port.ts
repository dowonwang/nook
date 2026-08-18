import type {
  OrganizationInvitation,
  OrganizationUuid,
} from '$modules/organization/domain';
import type { UserUuid } from '$modules/user/domain';

export interface OrganizationInvitationReader {
  findSentInvitations(params: {
    organizationId: OrganizationUuid;
    invitedByUserId: UserUuid;
  }): Promise<OrganizationInvitation[]>;
}
