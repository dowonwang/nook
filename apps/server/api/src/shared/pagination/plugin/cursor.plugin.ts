import { Elysia } from 'elysia';

import { DEFAULT_LIMIT } from '../constant';
import { cursorPaginationQuerySchema } from '../schema';

import type { CursorPagination } from '../types';

export const cursorPaginationPlugin = new Elysia({
  name: 'pagination.cursor',
})
  .guard({
    schema: 'standalone',
    query: cursorPaginationQuerySchema,
  })
  .resolve(({ query }) => {
    const cursor = query.cursor;
    const limit = query.limit || DEFAULT_LIMIT;

    const pagination: CursorPagination = {
      type: 'cursor' as const,
      cursor,
      limit,
    };

    return {
      pagination,
    };
  })
  .as('scoped');
