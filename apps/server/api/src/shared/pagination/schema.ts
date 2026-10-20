import { z } from 'zod';

import { DEFAULT_LIMIT, DEFAULT_PAGE } from './constant';

export const offsetPaginationQuerySchema = z.object({
  page: z.coerce
    .number<string>()
    .int()
    .min(1)
    .catch(DEFAULT_PAGE)
    .optional()
    .meta({
      description: 'The page number to retrieve.',
    }),
  limit: z.coerce
    .number<string>()
    .int()
    .min(1)
    .max(100)
    .catch(DEFAULT_LIMIT)
    .optional()
    .meta({
      description: 'The maximum number of items to return per page',
    }),
});

export const cursorPaginationQuerySchema = z.object({
  cursor: z.string().min(1).optional().meta({
    description: 'The cursor indicating where to start retrieving items',
  }),
  limit: z.coerce
    .number<string>()
    .int()
    .min(1)
    .max(100)
    .catch(DEFAULT_LIMIT)
    .optional()
    .meta({
      description: 'The maximum number of items to return per page',
    }),
});

export const offsetPaginationResultSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number(),
  hasNextPage: z.boolean(),
});

export const cursorPaginationResultSchema = z.object({
  nextCursor: z.string().optional(),
  hasNextPage: z.boolean(),
});

export const paginationResultSchema = offsetPaginationResultSchema.or(
  cursorPaginationResultSchema,
);
