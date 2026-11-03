import { queryOptions } from '@tanstack/react-query';

import { getReceivedOrganizationInvitationList } from '../api/get-received-list';
import { getSentOrganizationInvitationList } from '../api/get-sent-list';
import {
  SENT_ORGANIZATION_INVITATION_LIST_QUERY_KEY,
  RECEIVED_ORGANIZATION_INVITATION_LIST_QUERY_KEY,
} from '../config/query-key';

import type { OffsetPaginationQuery } from '$shared/types';

export function receivedOrganizationInvitationListQueryOptions(
  pagination: OffsetPaginationQuery,
) {
  return queryOptions({
    queryKey: RECEIVED_ORGANIZATION_INVITATION_LIST_QUERY_KEY(pagination),
    queryFn: () => getReceivedOrganizationInvitationList(pagination),
  });
}

export function sentOrganizationInvitationListQueryOptions(
  organizationId: string | undefined,
) {
  return queryOptions({
    queryKey: SENT_ORGANIZATION_INVITATION_LIST_QUERY_KEY(organizationId),
    queryFn: () => getSentOrganizationInvitationList(organizationId),
    enabled: Boolean(organizationId),
  });
}
