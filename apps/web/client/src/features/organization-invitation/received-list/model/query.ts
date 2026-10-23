import { queryOptions } from '@tanstack/react-query';

import { getReceivedOrganizationInvitations } from '../api/get-received-list';
import { RECEIVED_ORGANIZATION_INVITATION_LIST_QUERY_KEY } from '../config/query-key';

import type { OffsetPaginationQuery } from '$shared/types';

export function receivedOrganizationInvitationListQueryOptions(
  pagination: OffsetPaginationQuery,
) {
  return queryOptions({
    queryKey: RECEIVED_ORGANIZATION_INVITATION_LIST_QUERY_KEY(pagination),
    queryFn: () => getReceivedOrganizationInvitations(pagination),
  });
}
