'use client';

import { useSearchParams } from 'next/navigation';

import { parseNumber } from './parse-number';

import type { CursorPaginationQuery } from '$shared/types';

export function useCursorQuery(): CursorPaginationQuery {
  const searchParams = useSearchParams();
  const cursor = searchParams?.get('cursor');
  const limit = searchParams?.get('limit');

  return {
    cursor: typeof cursor === 'string' ? cursor : undefined,
    limit: parseNumber(limit),
  };
}
