import type {
  OrganizationInvitation,
  OrganizationUuid,
} from '$modules/organization/domain';
import type { UserUuid } from '$modules/user/domain';
import type {
  OffsetPagination,
  OffsetPaginationResult,
} from '$shared/pagination';

export interface OrganizationInvitationReader {
  findSentInvitations(
    params: {
      organizationId: OrganizationUuid;
      invitedByUserId: UserUuid;
    },
    pagination: OffsetPagination,
  ): Promise<{
    invitations: OrganizationInvitation[];
    paginationResult: OffsetPaginationResult;
  }>;

  findReceivedInvitations(
    params: { userId: UserUuid },
    pagination: OffsetPagination,
  ): Promise<{
    invitations: OrganizationInvitation[];
    paginationResult: OffsetPaginationResult;
  }>;
}
