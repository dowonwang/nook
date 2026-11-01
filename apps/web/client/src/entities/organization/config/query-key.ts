import type { OffsetPaginationQuery } from '$shared/types';

export const MY_ORGANIZATION_LIST_QUERY_KEY = (
  pagination: OffsetPaginationQuery,
) => ['organizations', 'my-list', pagination.page, pagination.limit] as const;
