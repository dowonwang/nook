import { parseNumber } from './parse-number';

import type {
  CursorPaginationQuery,
  OffsetPaginationQuery,
  SearchParams,
} from '$shared/types';

export async function getOffsetPaginationQuery(
  searchParams: Promise<SearchParams>,
): Promise<OffsetPaginationQuery> {
  const { page, limit } = await searchParams;

  return {
    page: parseNumber(page),
    limit: parseNumber(limit),
  };
}

export async function getCursorPaginationQuery(
  searchParams: Promise<SearchParams>,
): Promise<CursorPaginationQuery> {
  const { cursor, limit } = await searchParams;

  return {
    cursor: typeof cursor === 'string' ? cursor : undefined,
    limit: parseNumber(limit),
  };
}
