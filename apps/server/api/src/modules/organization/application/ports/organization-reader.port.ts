import type {
  Organization,
  OrganizationUuid,
} from '$modules/organization/domain';
import type { UserUuid } from '$modules/user/domain';
import type {
  OffsetPagination,
  OffsetPaginationResult,
} from '$shared/pagination';

export interface OrganizationReader {
  findUserOrganizations(
    params: { userId: UserUuid },
    pagination: OffsetPagination,
  ): Promise<{
    organizations: Organization[];
    paginationResult: OffsetPaginationResult;
  }>;
  findManyByIds(params: {
    organizationIds: OrganizationUuid[];
  }): Promise<Organization[]>;
}
