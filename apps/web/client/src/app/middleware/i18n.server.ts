import { createProxy } from 'next-i18next/proxy';

import { i18nConfig } from '$shared/i18n/server';
import { setI18nCookieToResponse } from '$shared/lib/cookie/server';

import type { I18nLocale } from '$shared/i18n';
import type { NextRequest } from 'next/server';

const nextI18nextProxy = createProxy(i18nConfig);

export function i18nMiddleware(request: NextRequest, locale: I18nLocale) {
  const response = nextI18nextProxy(request);

  setI18nCookieToResponse(response, locale);

  return response;
}
