export const USER_ERROR = [
  'user.error.UserNotFound',
  'user.error.EmailAlreadyExists',
  'user.error.InvaildCredentials',
] as const;

export type I18N_USER_ERROR = (typeof USER_ERROR)[number];
