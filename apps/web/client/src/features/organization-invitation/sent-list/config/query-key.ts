export const ORGANIZATION_INVITATION_SENT_LIST_QUERY_KEY = (
  organizationId: string | undefined,
) => ['organization-invitation', 'sent', organizationId] as const;
