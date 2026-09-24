import type { I18N_RESPONSE_KEY } from '../../response';

export const i18nResponseEn = {
  // common

  common_error_BadRequestError: 'Invalid request.',

  common_error_UnauthorizedError:
    'Authentication is required to use this service.',

  common_error_ForbiddenError:
    'You do not have permission to access this resource.',

  common_error_NotFoundError: 'The requested resource could not be found.',

  common_error_ConflictError: 'The data already exists.',

  common_error_UnprocessableContent: 'The information provided is invalid.',

  common_error_InternalServerError: 'A temporary error has occurred.',

  // auth

  auth_error_token_expired: 'Your login session has expired.',

  auth_signup_success_signin_required:
    'Your account has been created successfully.\nPlease sign in to continue.',

  auth_error_InvalidCredentials:
    'The email or password you entered is incorrect.',

  auth_error_EmailAlreadyExists:
    'An account with this email already exists, or this email cannot be used.',

  // user

  user_error_UserNotFound: 'User not found.',

  user_error_InvalidUserEmail: 'Please enter a valid email address.',

  user_error_InvalidUserName: 'Name must be between 2 and 20 characters.',

  // organization

  organization_error_OrganizationAccessDenied:
    'You do not have permission to access this organization.',

  organization_error_DuplicateOrganizationMember:
    'This member is already registered in the organization.',

  organization_error_DuplicateOrganizationTitle:
    'This organization name is already in use.',

  organization_error_MinMemberConstraint:
    'This organization name cannot be used.',

  organization_error_OrganizationAdminLimitExceeded:
    'The maximum number of organization administrators has been exceeded.',

  organization_error_OrganizationAdminRequirement:
    'The organization must have at least one administrator.',

  organization_error_OrganizationNotFound:
    'The organization could not be found, or you do not have permission to access it.',

  organization_error_UnaffiliatedMember:
    'You are not a member of this organization, or you do not have permission to access it.',

  organization_error_InvalidOrganizationMemberRole:
    'Invalid organization member role.',

  organization_error_InvalidOrganizationInvitationStatus:
    'Invalid organization member status.',

  organization_error_DuplicateInviteeUser:
    'This user is already a member of the organization.',

  organization_error_InviteeUserNotFound:
    'The user you are trying to invite could not be found.',

  organization_error_SelfInvitation: 'You cannot invite yourself.',

  organization_error_PendingInvitationExist:
    'An invitation has already been sent to this member.',
} satisfies Record<I18N_RESPONSE_KEY, string>;
