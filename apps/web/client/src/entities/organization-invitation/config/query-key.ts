import type { OffsetPaginationQuery } from '$shared/types';

// 페이지와 상관없이 받은 초대 목록 전체를 무효화할 때 사용
export const RECEIVED_ORGANIZATION_INVITATION_LIST_BASE_QUERY_KEY = [
  'organizations',
  'invitations',
] as const;

export const RECEIVED_ORGANIZATION_INVITATION_LIST_QUERY_KEY = (
  pagination: OffsetPaginationQuery,
) =>
  [
    ...RECEIVED_ORGANIZATION_INVITATION_LIST_BASE_QUERY_KEY,
    pagination.page,
    pagination.limit,
  ] as const;

export const ORGANIZATION_INVITATION_SENT_LIST_QUERY_KEY = (
  organizationId: string | undefined,
) => ['organization-invitation', 'sent', organizationId] as const;
