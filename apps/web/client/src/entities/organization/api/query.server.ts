import { queryOptions } from '@tanstack/react-query';

import { getMyOrganizationListServer } from './get-my-list.server';
import { MY_ORGANIZATION_LIST_QUERY_KEY } from './query-key';

import type { OffsetPaginationQuery } from '$shared/lib/pagination';

export function serverMyOrganizationListQueryOptions(
  pagination: OffsetPaginationQuery,
) {
  return queryOptions({
    queryKey: MY_ORGANIZATION_LIST_QUERY_KEY(pagination),
    queryFn: () => getMyOrganizationListServer(pagination),
  });
}
