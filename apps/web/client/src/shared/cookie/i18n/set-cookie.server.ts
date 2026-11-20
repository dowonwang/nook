import { I18N_COOKIE_NAME, I18N_COOKIE_OPTIONS } from './constant';

import type { NextResponse } from 'next/server';
import type { I18nLocale } from '$shared/i18n';

export function setI18nCookieToResponse(
  response: NextResponse,
  value: I18nLocale,
) {
  response.cookies.set(I18N_COOKIE_NAME, value, I18N_COOKIE_OPTIONS);
}
