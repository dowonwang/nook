import type { OffsetPaginationQuery } from '$shared/types';

export const RECEIVED_ORGANIZATION_INVITATION_LIST_QUERY_KEY = (
  pagination: OffsetPaginationQuery,
) =>
  ['organizations', 'invitations', pagination.page, pagination.limit] as const;

export const ORGANIZATION_INVITATION_SENT_LIST_QUERY_KEY = (
  organizationId: string | undefined,
) => ['organization-invitation', 'sent', organizationId] as const;
