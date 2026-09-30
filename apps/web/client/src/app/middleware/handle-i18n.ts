import { createProxy } from 'next-i18next/proxy';

import { i18nConfig } from '$shared/i18n/server';
import { setI18nCookieToResponse } from '$shared/lib/cookie/server';

import type { I18nLocale } from '$shared/i18n';
import type { NextRequest } from 'next/server';

const i18nMiddleware = createProxy(i18nConfig);

export function handleI18n(request: NextRequest, locale: I18nLocale) {
  const response = i18nMiddleware(request);

  setI18nCookieToResponse(response, locale);

  return response;
}
