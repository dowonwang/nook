export const FLASH_COOKIE_NAME = '_flash_' as const;
export const FLASH_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'lax',
  path: '/',
  secure: true,
  maxAge: 10,
} as const;
