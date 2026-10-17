'use server';

import { bffFetcher } from '$shared/api/bff/bff-fetcher';
import { createSearchParams } from '$shared/lib/http';

import type { OffsetPaginationQuery } from '$shared/types';
import type { GetOrganization200 } from '@packages/api-client/api';

export async function getMyOrganizationListServer(
  query?: OffsetPaginationQuery,
) {
  const searchParams = createSearchParams(query);

  const response = await bffFetcher(
    '/api/organization?' + searchParams.toString(),
    {
      method: 'GET',
    },
  );

  if (response.ok) {
    const { data, meta } = (await response.json()) as GetOrganization200;

    return { data, meta };
  }

  return { data: [], meta: undefined };
}
