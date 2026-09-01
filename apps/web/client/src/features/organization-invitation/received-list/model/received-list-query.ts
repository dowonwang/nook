import { queryOptions } from '@tanstack/react-query';

import { getReceivedOrganizationInvitations } from '../api/get-received-list';
import { RECEIVED_ORGANIZATION_INVITATION_LIST_QUERY_KEY } from '../config/query-key';

export const receivedOrganizationInvitationListQueryOptions = queryOptions({
  queryKey: RECEIVED_ORGANIZATION_INVITATION_LIST_QUERY_KEY,
  queryFn: getReceivedOrganizationInvitations,
});
