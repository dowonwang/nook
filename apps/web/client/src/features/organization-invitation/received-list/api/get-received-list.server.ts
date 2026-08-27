import { bffFetcher } from '$shared/api/bff/bff-fetcher';

import type { GetOrganizationInvitations200 } from '@packages/api-client/api';

export async function getReceivedOrganizationInvitationsServer() {
  const response = await bffFetcher('/api/organization/invitations', {
    method: 'GET',
  });

  if (response.ok) {
    const { data } = (await response.json()) as GetOrganizationInvitations200;

    return data;
  }

  return [];
}
