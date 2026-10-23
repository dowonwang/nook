import type { OffsetPaginationQuery } from '$shared/types';

export const RECEIVED_ORGANIZATION_INVITATION_LIST_QUERY_KEY = (
  pagination: OffsetPaginationQuery,
) =>
  ['organizations', 'invitations', pagination.page, pagination.limit] as const;
