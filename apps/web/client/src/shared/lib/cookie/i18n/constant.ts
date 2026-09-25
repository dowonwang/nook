export const I18N_COOKIE_NAME = 'i18n-locale' as const;
export const I18N_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const I18N_COOKIE_OPTIONS = {
  path: '/',
  sameSite: 'lax',
  maxAge: I18N_COOKIE_MAX_AGE,
} as const;
