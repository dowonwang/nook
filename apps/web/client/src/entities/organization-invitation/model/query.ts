import { queryOptions } from '@tanstack/react-query';

import { getReceivedOrganizationInvitations } from '../api/get-received-list';
import { getOrganizationInvitationSentList } from '../api/get-sent-list';
import {
  ORGANIZATION_INVITATION_SENT_LIST_QUERY_KEY,
  RECEIVED_ORGANIZATION_INVITATION_LIST_QUERY_KEY,
} from '../config/query-key';

import type { OffsetPaginationQuery } from '$shared/types';

export function receivedOrganizationInvitationListQueryOptions(
  pagination: OffsetPaginationQuery,
) {
  return queryOptions({
    queryKey: RECEIVED_ORGANIZATION_INVITATION_LIST_QUERY_KEY(pagination),
    queryFn: () => getReceivedOrganizationInvitations(pagination),
  });
}

export function organizationInvitationSentListQueryOptions(
  organizationId: string | undefined,
) {
  return queryOptions({
    queryKey: ORGANIZATION_INVITATION_SENT_LIST_QUERY_KEY(organizationId),
    queryFn: () => getOrganizationInvitationSentList(organizationId),
    enabled: Boolean(organizationId),
  });
}
