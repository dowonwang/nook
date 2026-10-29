import type {
  OrganizationInvitationAggregate,
  OrganizationUuidVo,
} from '$modules/organization/domain';
import type { UserUuidVo } from '$modules/user/domain';
import type {
  OffsetPagination,
  OffsetPaginationResult,
} from '$shared/pagination';

export interface OrganizationInvitationReaderPort {
  findSentInvitations(
    params: {
      organizationId: OrganizationUuidVo;
      invitedByUserId: UserUuidVo;
    },
    pagination: OffsetPagination,
  ): Promise<{
    invitations: OrganizationInvitationAggregate[];
    paginationResult: OffsetPaginationResult;
  }>;

  findReceivedInvitations(
    params: { userId: UserUuidVo },
    pagination: OffsetPagination,
  ): Promise<{
    invitations: OrganizationInvitationAggregate[];
    paginationResult: OffsetPaginationResult;
  }>;
}
