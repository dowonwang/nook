export const AUTH_ERROR = [
  'auth.error.InvalidUserUUID',
  'auth.error.EmailAlreadyExists',
] as const;

export type I18N_AUTH_ERROR_KEY = (typeof AUTH_ERROR)[number];
