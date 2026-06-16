export const USER_ERROR = [
  'user.error.UserNotFound',
  'user.error.EmailAlreadyExists',
  'user.error.InvaildCredentials',
  'user.error.InvalidUserEmail',
  'user.error.InvalidUserName',
] as const;

export type I18N_USER_ERROR = (typeof USER_ERROR)[number];
