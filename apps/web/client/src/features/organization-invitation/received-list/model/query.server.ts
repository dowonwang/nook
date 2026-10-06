import { queryOptions } from '@tanstack/react-query';

import { getReceivedOrganizationInvitationsServer } from '../api/get-received-list.server';
import { RECEIVED_ORGANIZATION_INVITATION_LIST_QUERY_KEY } from '../config/query-key';

export const serverReceivedOrganizationListQueryOptions = queryOptions({
  queryKey: RECEIVED_ORGANIZATION_INVITATION_LIST_QUERY_KEY,
  queryFn: getReceivedOrganizationInvitationsServer,
});
