import { I18N_COOKIE_NAME, I18N_COOKIE_OPTIONS } from './constant';

import type { I18nLocale } from '$shared/config';
import type { NextResponse } from 'next/server';

export function setI18nCookieToResponse(
  response: NextResponse,
  value: I18nLocale,
) {
  response.cookies.set(I18N_COOKIE_NAME, value, I18N_COOKIE_OPTIONS);
}
