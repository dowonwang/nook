import type {
  OrganizationAggregate,
  OrganizationUuidVo,
} from '$modules/organization/domain';
import type { UserUuidVo } from '$modules/user/domain';
import type {
  OffsetPagination,
  OffsetPaginationResult,
} from '$shared/pagination';

export interface OrganizationReaderPort {
  findUserOrganizations(
    params: { userId: UserUuidVo },
    pagination: OffsetPagination,
  ): Promise<{
    organizations: OrganizationAggregate[];
    paginationResult: OffsetPaginationResult;
  }>;
  findManyByIds(params: {
    organizationIds: OrganizationUuidVo[];
  }): Promise<OrganizationAggregate[]>;
}
