import { queryOptions } from '@tanstack/react-query';

import { getMyOrganizationList } from './get-my-list';
import { MY_ORGANIZATION_LIST_QUERY_KEY } from './query-key';

import type { OffsetPaginationQuery } from '$shared/lib/pagination';

export function myOrganizationListQueryOptions(
  pagination: OffsetPaginationQuery,
) {
  return queryOptions({
    queryKey: MY_ORGANIZATION_LIST_QUERY_KEY(pagination),
    queryFn: () => getMyOrganizationList(pagination),
  });
}
