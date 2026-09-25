import { I18N_FALLBACK_LOCALE, I18N_LOCALE } from '$shared/config';
import { getI18nCookieFromRequest } from '$shared/lib/cookie/server';

import type { I18nLocale } from '$shared/config';
import type { NextRequest } from 'next/server';

export function resolveRequestLocale(request: NextRequest): I18nLocale {
  const cookieLocale = getI18nCookieFromRequest(request, false);

  if (cookieLocale && I18N_LOCALE.includes(cookieLocale)) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get('accept-language');

  if (acceptLanguage) {
    const languages = acceptLanguage
      .split(',')
      .map((value) => value.split(';')[0]?.trim());

    for (const language of languages) {
      const baseLanguage = language.split('-')[0];

      if (baseLanguage && I18N_LOCALE.includes(baseLanguage as I18nLocale)) {
        return baseLanguage as I18nLocale;
      }
    }
  }

  return I18N_FALLBACK_LOCALE;
}
