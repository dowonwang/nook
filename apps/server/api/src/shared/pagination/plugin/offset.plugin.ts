import { Elysia } from 'elysia';

import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../constant';
import { offsetPaginationQuerySchema } from '../schema';

import type { OffsetPagination } from '../types';

export const offsetPaginationPlugin = new Elysia({
  name: 'pagination.offset',
})
  .guard({
    schema: 'standalone',
    query: offsetPaginationQuerySchema,
  })
  .resolve(({ query }) => {
    const page = query.page || DEFAULT_PAGE;
    const limit = query.limit || DEFAULT_LIMIT;

    const pagination: OffsetPagination = {
      type: 'offset' as const,
      page,
      limit,
      skip: (page - 1) * limit,
    };

    return {
      pagination,
    };
  })
  .as('scoped');
