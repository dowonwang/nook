'use client';

import { useSearchParams } from 'next/navigation';

import { parseNumber } from './parse-number';

import type { OffsetPaginationQuery } from '$shared/types';

export function useOffsetQuery(): OffsetPaginationQuery {
  const searchParams = useSearchParams();
  const page = searchParams?.get('page');
  const limit = searchParams?.get('limit');

  return {
    page: parseNumber(page),
    limit: parseNumber(limit),
  };
}
