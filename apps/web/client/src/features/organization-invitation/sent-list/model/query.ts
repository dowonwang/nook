import { queryOptions } from '@tanstack/react-query';

import { getOrganizationInvitationSentList } from '../api/get-sent-list';
import { ORGANIZATION_INVITATION_SENT_LIST_QUERY_KEY } from '../config/query-key';

export function organizationInvitationSentListQueryOptions(
  organizationId: string | undefined,
) {
  return queryOptions({
    queryKey: ORGANIZATION_INVITATION_SENT_LIST_QUERY_KEY(organizationId),
    queryFn: () => getOrganizationInvitationSentList(organizationId),
    enabled: Boolean(organizationId),
  });
}
