export const USER_ERROR = [
  'user_error_UserNotFound',
  'user_error_EmailAlreadyExists',
  'user_error_InvalidUserEmail',
  'user_error_InvalidUserName',
] as const;

export type I18N_USER_ERROR = (typeof USER_ERROR)[number];
