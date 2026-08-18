export const ORGANIZATION_ERROR = [
  'organization_error_OrganizationAccessDenied',
  'organization_error_DuplicateOrganizationMember',
  'organization_error_DuplicateOrganizationTitle',
  'organization_error_MinMemberConstraint',
  'organization_error_OrganizationAdminLimitExceeded',
  'organization_error_OrganizationAdminRequirement',
  'organization_error_OrganizationNotFound',
  'organization_error_UnaffiliatedMember',
  'organization_error_InvalidOrganizationMemberRole',
  'organization_error_InvalidOrganizationInvitationStatus',
  'organization_error_DuplicateInviteeUser',
  'organization_error_InviteeUserNotFound',
  'organization_error_SelfInvitation',
  'organization_error_PendingInvitationExist',
] as const;

export type I18N_ORGANIZATION_ERROR = (typeof ORGANIZATION_ERROR)[number];
