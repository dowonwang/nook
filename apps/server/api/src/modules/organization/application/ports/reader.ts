import type {
  OrganizationAggregate,
  OrganizationSlugVo,
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
  findBySlug(slug: OrganizationSlugVo): Promise<OrganizationAggregate | null>;
}
