import type { OffsetPagination, OffsetPaginationResult } from '../types';

export function offsetPaginationResultBuilder(
  pagination: OffsetPagination,
  count: number,
): OffsetPaginationResult {
  const totalPages = Math.ceil(count / pagination.limit);

  return {
    limit: pagination.limit,
    page: pagination.page,
    total: count,
    totalPages,
    hasNextPage: totalPages > pagination.page,
  };
}
