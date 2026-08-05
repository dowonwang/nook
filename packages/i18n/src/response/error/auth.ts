export const AUTH_ERROR = [
  'auth_error_token_expired',
  'auth_error_InvaildCredentials',
  'auth_error_EmailAlreadyExists',
] as const;

export type I18N_AUTH_ERROR = (typeof AUTH_ERROR)[number];
