import {
  I18N_COOKIE_NAME,
  I18N_FALLBACK_LANGUAGE,
  I18N_LANGUAGES,
} from '$shared/config';

import type { I18nLanguagesType } from '$shared/config';
import type { NextRequest } from 'next/server';

export function resolveRequestLocale(request: NextRequest): I18nLanguagesType {
  const cookieLocale = request.cookies.get(I18N_COOKIE_NAME)?.value;

  if (
    cookieLocale &&
    I18N_LANGUAGES.includes(cookieLocale as I18nLanguagesType)
  ) {
    return cookieLocale as I18nLanguagesType;
  }

  const acceptLanguage = request.headers.get('accept-language');

  if (acceptLanguage) {
    const languages = acceptLanguage
      .split(',')
      .map((value) => value.split(';')[0]?.trim());

    for (const language of languages) {
      const baseLanguage = language.split('-')[0];

      if (
        baseLanguage &&
        I18N_LANGUAGES.includes(baseLanguage as I18nLanguagesType)
      ) {
        return baseLanguage as I18nLanguagesType;
      }
    }
  }

  return I18N_FALLBACK_LANGUAGE;
}
