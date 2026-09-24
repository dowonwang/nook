import { I18N_LANGUAGES, type I18nLanguagesType } from '$shared/config';

export function getLocaleFromPathname(
  pathname: string,
): I18nLanguagesType | null {
  const locale = pathname.split('/')[1];

  if (I18N_LANGUAGES.includes(locale as I18nLanguagesType)) {
    return locale as I18nLanguagesType;
  }

  return null;
}
