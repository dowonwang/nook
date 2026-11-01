import type { OffsetPaginationQuery } from '$shared/types';

// 페이지와 상관없이 내 조직 목록 전체를 무효화할 때 사용
export const MY_ORGANIZATION_LIST_BASE_QUERY_KEY = [
  'organizations',
  'my-list',
] as const;

export const MY_ORGANIZATION_LIST_QUERY_KEY = (
  pagination: OffsetPaginationQuery,
) =>
  [
    ...MY_ORGANIZATION_LIST_BASE_QUERY_KEY,
    pagination.page,
    pagination.limit,
  ] as const;
