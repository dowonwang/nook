import { cookies } from 'next/headers';

import { I18N_FALLBACK_LOCALE } from '$shared/config';

import { I18N_COOKIE_NAME } from './constant';

import type { I18nLocale } from '$shared/config';
import type { NextRequest } from 'next/server';

export function getI18nCookieFromRequest(
  request: NextRequest,
  useFallback?: true,
): I18nLocale;
export function getI18nCookieFromRequest(
  request: NextRequest,
  useFallback: false,
): null | I18nLocale;
export function getI18nCookieFromRequest(
  request: NextRequest,
  useFallback = true,
): I18nLocale | null {
  const value = request.cookies.get(I18N_COOKIE_NAME)?.value;

  if (!value) {
    if (useFallback) {
      return I18N_FALLBACK_LOCALE;
    }

    return null;
  }
  return value as I18nLocale;
}

export async function getI18nCookie(): Promise<I18nLocale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(I18N_COOKIE_NAME)?.value;

  if (!value) return I18N_FALLBACK_LOCALE;
  return value as I18nLocale;
}
