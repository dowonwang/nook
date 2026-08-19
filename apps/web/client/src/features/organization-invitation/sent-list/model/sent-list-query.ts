import { queryOptions } from '@tanstack/react-query';

import { findOrganizationInvitationSentList } from '../api/sent-list';
import { ORGANIZATION_INVITATION_SENT_LIST_QUERY_KEY } from '../config/query-key';

export function organizationInvitationSentListQueryOptions(
  organizationId: string | undefined,
) {
  return queryOptions({
    queryKey: ORGANIZATION_INVITATION_SENT_LIST_QUERY_KEY(organizationId),
    queryFn: () => findOrganizationInvitationSentList(organizationId),
    enabled: Boolean(organizationId),
  });
}
