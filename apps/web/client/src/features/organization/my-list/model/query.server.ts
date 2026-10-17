import { queryOptions } from '@tanstack/react-query';

import { getMyOrganizationListServer } from '../api/get-my-list.server';
import { MY_ORGANIZATION_LIST_QUERY_KEY } from '../config/query-key';

import type { OffsetPaginationQuery } from '$shared/types';

export function createServerMyOrganizationListQueryOptions(
  query?: OffsetPaginationQuery,
) {
  return queryOptions({
    queryKey: MY_ORGANIZATION_LIST_QUERY_KEY,
    queryFn: () => getMyOrganizationListServer(query),
  });
}
