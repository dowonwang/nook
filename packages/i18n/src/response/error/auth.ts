export const AUTH_ERROR = [
  'auth_error_token_expired',
  'auth_error_InvalidCredentials',
  'auth_error_EmailAlreadyExists',
  'auth_error_InvalidPasswordFormat',
] as const;

export type I18N_AUTH_ERROR = (typeof AUTH_ERROR)[number];
