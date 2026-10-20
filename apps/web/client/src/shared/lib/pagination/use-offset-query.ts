'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { parseNumber } from './parse-number';

import type { OffsetPaginationQuery } from '$shared/types';

export function useOffsetQuery(): OffsetPaginationQuery {
  const searchParams = useSearchParams();
  const page = searchParams?.get('page');
  const limit = searchParams?.get('limit');

  return useMemo(
    () => ({
      page: parseNumber(page),
      limit: parseNumber(limit),
    }),
    [page, limit],
  );
}
