export const ORGANIZATION_LOG_EVENT = {
  ORG_DUPLICATE_TITLE: 'org.duplicate_title',
  ORG_TITLE_EMPTY: 'org.title_empty',
  ORG_NOT_FOUND: 'org.not_found',
  ORG_MIN_MEMBER_VIOLATION: 'org.min_member_violation',
  ORG_MEMBER_UNAFFILIATED_ACCESS: 'org.member_unaffiliated_access',
  ORG_MEMBER_DUPLICATE_ENTRY: 'org.member_duplicate_entry',
  ORG_ADMIN_REQUIREMENT: 'org.admin_requirement',
  ORG_ADMIN_LIMIT_EXCEED: 'org.admin_limit_exceed',
  ORG_INSUFFICIENT_PERMISSION: 'org.insufficient_permission',
} as const;

export type OrganizationLogEventMessage = Record<
  keyof typeof ORGANIZATION_LOG_EVENT,
  string
>;
