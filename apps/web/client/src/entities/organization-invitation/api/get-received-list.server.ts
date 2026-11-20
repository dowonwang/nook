import { serverFetcher } from '$shared/api/bff/server';
import { createSearchParams } from '$shared/lib/http';

import type { GetOrganizationInvitations200 } from '@packages/api-client/api';
import type { OffsetPaginationQuery } from '$shared/lib/pagination';

export async function getReceivedOrganizationInvitationListServer(
  query?: OffsetPaginationQuery,
) {
  const searchParams = createSearchParams(query);

  const response = await serverFetcher(
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
