import type { OffsetPagination } from '../types';

export const offsetPaginationBuilder = {
  toResult: (pagination: OffsetPagination, count: number) => {
    const totalPages = Math.ceil(count / pagination.limit);

    return {
      limit: pagination.limit,
      page: pagination.page,
      total: count,
      totalPages,
      hasNextPage: totalPages > pagination.page,
    };
  },

  toOptions: (pagination: OffsetPagination) => ({
    skip: pagination.skip,
    take: pagination.limit,
  }),
};
