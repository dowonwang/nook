export const ORGANIZATION_ERROR = [
  'organization.error.OrganizationAccessDenied',
  'organization.error.DuplicateOrganizationMember',
  'organization.error.DuplicateOrganizationTitle',
  'organization.error.MinMemberConstraint',
  'organization.error.OrganizationAdminLimitExceeded',
  'organization.error.OrganizationAdminRequirement',
  'organization.error.OrganizationNotFound',
  'organization.error.UnaffiliatedMember',
] as const;

export type I18N_ORGANIZATION_ERROR = (typeof ORGANIZATION_ERROR)[number];
