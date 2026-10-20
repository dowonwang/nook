import { queryOptions } from '@tanstack/react-query';

import { getMyOrganizationList } from '../api/get-my-list';
import { MY_ORGANIZATION_LIST_QUERY_KEY } from '../config/query-key';

import type { OffsetPaginationQuery } from '$shared/types';

export function createMyOrganizationListQueryOptions(
  pagination: OffsetPaginationQuery,
) {
  return queryOptions({
    queryKey: MY_ORGANIZATION_LIST_QUERY_KEY(pagination),
    queryFn: () => getMyOrganizationList(pagination),
  });
}
