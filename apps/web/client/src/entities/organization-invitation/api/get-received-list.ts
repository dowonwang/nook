import { clientFetcher } from '$shared/api/bff';
import { createSearchParams } from '$shared/lib/http';

import type { OffsetPaginationQuery } from '$shared/types';
import type { OrganizationInvitationInvitedBy } from '../model/types';
import type { GetOrganizationInvitations200 } from '@packages/api-client/api';

export async function getReceivedOrganizationInvitationList(
  query?: OffsetPaginationQuery,
) {
  const searchParams = createSearchParams(query);

  const response = await clientFetcher(
    '/api/organization/invitations?' + searchParams.toString(),
    {
      method: 'GET',
    },
  );

  if (response.ok) {
    const { data, meta } =
      (await response.json()) as GetOrganizationInvitations200;

    return {
      data: data.map((item) => ({
        id: item.id,
        organization: item.organization,
        invitedBy: item.invitedBy as OrganizationInvitationInvitedBy | null,
        role: item.role,
        status: item.status,
        expiresAt: item.expiresAt,
      })),
      meta,
    };
  }

  return {
    data: [],
    meta: undefined,
  };
}
