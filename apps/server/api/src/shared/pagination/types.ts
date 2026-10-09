import type {
  cursorPaginationResultSchema,
  offsetPaginationResultSchema,
} from './schema';
import type { z } from 'zod';

export type PaginationType = 'offset' | 'cursor';

export interface OffsetPagination {
  readonly type: 'offset';
  readonly page: number;
  readonly limit: number;
  readonly skip: number;
}

export interface CursorPagination {
  readonly type: 'cursor';
  readonly cursor?: string;
  readonly limit: number;
}

export type Pagination = OffsetPagination | CursorPagination;
export type OffsetPaginationResult = z.infer<
  typeof offsetPaginationResultSchema
>;
export type CursorPaginationResult = z.infer<
  typeof cursorPaginationResultSchema
>;
