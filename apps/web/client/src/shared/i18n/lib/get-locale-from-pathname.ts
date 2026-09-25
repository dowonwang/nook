import { I18N_LOCALE, type I18nLocale } from '$shared/config';

export function getLocaleFromPathname(pathname: string): I18nLocale | null {
  const locale = pathname.split('/')[1];

  if (I18N_LOCALE.includes(locale as I18nLocale)) {
    return locale as I18nLocale;
  }

  return null;
}
