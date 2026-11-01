import { queryOptions } from '@tanstack/react-query';

import { getReceivedOrganizationInvitationsServer } from '../api/get-received-list.server';
import { RECEIVED_ORGANIZATION_INVITATION_LIST_QUERY_KEY } from '../config/query-key';

import type { OffsetPaginationQuery } from '$shared/types';

export function serverReceivedOrganizationListQueryOptions(
  pagination: OffsetPaginationQuery,
) {
  return queryOptions({
    queryKey: RECEIVED_ORGANIZATION_INVITATION_LIST_QUERY_KEY(pagination),
    queryFn: () => getReceivedOrganizationInvitationsServer(pagination),
  });
}
