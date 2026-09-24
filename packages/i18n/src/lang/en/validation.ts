import type { I18N_VALIDATION_KEY } from '../../validation';

export const i18ValidationEn = {
  GetUserQueryParams_email_regex: 'Please enter a valid email address.',

  GetUserQueryParams_email_string: 'Please enter a valid email address.',

  PostAuthSignInBody_email_regex: 'Please enter a valid email address.',

  PostAuthSignInBody_email_string: 'Please enter your email address.',

  PostAuthSignInBody_password_string: 'Please enter your password.',

  PostAuthSignUpBody_email_regex: 'Please enter a valid email address.',

  PostAuthSignUpBody_email_string: 'Please enter your email address.',

  PostAuthSignUpBody_name_max: 'Name must be between 2 and 20 characters.',

  PostAuthSignUpBody_name_min: 'Name must be between 2 and 20 characters.',

  PostAuthSignUpBody_name_string: 'Please enter your name.',

  PostAuthSignUpBody_password_string: 'Please enter your password.',

  PostAuthSignUpBody_confirmPassword_mismatch: 'Passwords do not match.',

  PostOrganizationBody_title_string: 'Please enter an organization name.',

  PostOrganizationBody_title_max:
    'Organization name must be fewer than 20 characters.',

  PostOrganizationBody_title_min: 'Please enter an organization name.',

  PostOrganizationByOrganizationIdInvitationsBody_role_enum:
    'Invalid organization member role.',

  PostOrganizationByOrganizationIdInvitationsBody_email_regex:
    'Please enter a valid email address.',

  PostOrganizationByOrganizationIdInvitationsBody_email_string:
    'Please enter a valid email address.',

  PostOrganizationByOrganizationIdInvitationsBody_required_organization_id:
    'The organization does not exist or is invalid. Please check the organization information.',

  PatchOrganizationInvitationBody_invitationId_regex:
    'The invitation does not exist or is invalid.',

  PatchOrganizationInvitationBody_invitationId_uuid:
    'The invitation does not exist or is invalid.',

  PatchOrganizationInvitationBody_status_enum:
    'Invalid invitation response. Please check and try again.',
} satisfies Record<I18N_VALIDATION_KEY, string>;
