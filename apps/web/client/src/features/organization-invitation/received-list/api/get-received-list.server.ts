import { bffFetcher } from '$shared/api/bff/bff-fetcher';
import { createSearchParams } from '$shared/lib/http';

import type { OffsetPaginationQuery } from '$shared/types';
import type { GetOrganizationInvitations200 } from '@packages/api-client/api';

export async function getReceivedOrganizationInvitationsServer(
  query?: OffsetPaginationQuery,
) {
  const searchParams = createSearchParams(query);

  const response = await bffFetcher(
    '/api/organization/invitations?' + searchParams.toString(),
    {
      method: 'GET',
    },
  );

  if (response.ok) {
    const { data, meta } =
      (await response.json()) as GetOrganizationInvitations200;

    return { data, meta };
  }

  return { data: [], meta: undefined };
}
