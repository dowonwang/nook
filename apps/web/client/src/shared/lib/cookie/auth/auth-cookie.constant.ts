export const ACCESS_TOKEN_COOKIE_NAME = '_auth_access_' as const;
export const REFRESH_TOKEN_COOKIE_NAME = '_auth_refresh_' as const;

export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'lax',
  path: '/',
  secure: true,
} as const;
