'use server';

import { bffFetcher } from '$shared/api/bff/bff-fetcher';

import type { GetOrganization200 } from '@packages/api-client/api';

export async function getMyOrganizationListServer() {
  const response = await bffFetcher('/api/organization', {
    method: 'GET',
  });

  if (response.ok) {
    const { data } = (await response.json()) as GetOrganization200;

    return data;
  }

  return [];
}
