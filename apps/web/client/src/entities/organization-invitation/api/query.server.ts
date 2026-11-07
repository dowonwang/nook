import { queryOptions } from '@tanstack/react-query';

import { getReceivedOrganizationInvitationListServer } from './get-received-list.server';
import { RECEIVED_ORGANIZATION_INVITATION_LIST_QUERY_KEY } from './query-key';

import type { OffsetPaginationQuery } from '$shared/lib/pagination';

export function serverReceivedOrganizationInvitationListQueryOptions(
  pagination: OffsetPaginationQuery,
) {
  return queryOptions({
    queryKey: RECEIVED_ORGANIZATION_INVITATION_LIST_QUERY_KEY(pagination),
    queryFn: () => getReceivedOrganizationInvitationListServer(pagination),
  });
}
