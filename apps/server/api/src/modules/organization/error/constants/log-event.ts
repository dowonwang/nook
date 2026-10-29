export const ORGANIZATION_LOG_EVENT = {
  ORG_TITLE_EMPTY: 'org_title_empty',
  ORG_INVALID_SLUG: 'org_invalid_slug',
  ORG_DUPLICATE_SLUG: 'org_duplicate_slug',
  ORG_NOT_FOUND: 'org_not_found',
  ORG_MIN_MEMBER_VIOLATION: 'org_min_member_violation',
  ORG_MEMBER_UNAFFILIATED_ACCESS: 'org_member_unaffiliated_access',
  ORG_MEMBER_DUPLICATE_ENTRY: 'org_member_duplicate_entry',
  ORG_ADMIN_REQUIREMENT: 'org_admin_requirement',
  ORG_INSUFFICIENT_PERMISSION: 'org_insufficient_permission',
  ORG_INVALID_MEMBER_ROLE: 'org_invalid_member_role',
  ORG_INVALID_INVITATION_STATUS: 'org_invalid_invitation_status',
  ORG_DUPLICATE_INVITEE_USER: 'org_duplicate_invitee_user',
  ORG_INVITEE_USER_NOT_FOUND: 'org_invitee_user_not_found',
  ORG_SELF_INVITATION: 'org_self_invitation',
  ORG_PENDING_INVITATION_EXIST: 'org_pending_invitation_exist',
  ORG_INVITATION_NOT_FOUND: 'org_invitation_not_found',
  ORG_INVITATION_INSUFFICIENT_PERMISSION:
    'org_invitation_insufficient_permission',
  ORG_INVITATION_EXPIRED: 'org_invitation_expired',
} as const;

export type OrganizationLogEventMessage = Record<
  keyof typeof ORGANIZATION_LOG_EVENT,
  string
>;
