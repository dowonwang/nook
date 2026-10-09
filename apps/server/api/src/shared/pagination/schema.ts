import { z } from 'zod';

export const offsetPaginationQuerySchema = z.object({
  page: z.number().min(1).multipleOf(1).optional(),
  limit: z.number().min(1).max(100).multipleOf(1).optional(),
});

export const cursorPaginationQuerySchema = z.object({
  cursor: z.string().min(1).optional(),
  limit: z.number().min(1).max(100).multipleOf(1).optional(),
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
