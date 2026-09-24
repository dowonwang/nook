import { createProxy } from 'next-i18next/proxy';

import {
  I18N_COOKIE_MAX_AGE,
  I18N_COOKIE_NAME,
  type I18nLanguagesType,
} from '$shared/config';
import { i18nConfig } from '$shared/i18n/server';

import type { NextRequest } from 'next/server';

const i18nMiddleware = createProxy(i18nConfig);

export function handleI18n(request: NextRequest, locale: I18nLanguagesType) {
  const response = i18nMiddleware(request);

  response.cookies.set(I18N_COOKIE_NAME, locale, {
    path: '/',
    sameSite: 'lax',
    maxAge: I18N_COOKIE_MAX_AGE,
  });

  return response;
}
