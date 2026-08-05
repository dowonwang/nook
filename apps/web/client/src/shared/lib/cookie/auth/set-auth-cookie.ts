import { cookies } from 'next/headers';

import { SERVER_ENV_CONFIG } from '$shared/config/server';
import { signedValue } from '$shared/lib/crypto';

import {
  ACCESS_TOKEN_COOKIE_NAME,
  AUTH_COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE_NAME,
} from './auth-cookie.constant';

import type { NextResponse } from 'next/server';

export async function setAuthCookie(
  accessToken: string,
  refreshToken: string,
): Promise<void> {
  const AUTH_SECRET = SERVER_ENV_CONFIG.AUTH_COOKIE_SECRET;
  const cookieStore = await cookies();

  cookieStore.set(
    ACCESS_TOKEN_COOKIE_NAME,
    signedValue(accessToken, AUTH_SECRET),
    AUTH_COOKIE_OPTIONS,
  );

  cookieStore.set(
    REFRESH_TOKEN_COOKIE_NAME,
    signedValue(refreshToken, AUTH_SECRET),
    AUTH_COOKIE_OPTIONS,
  );
}

export function setAuthCookieToResponse(
  response: NextResponse,
  accessToken: string,
  refreshToken: string,
) {
  const AUTH_SECRET = SERVER_ENV_CONFIG.AUTH_COOKIE_SECRET;

  response.cookies.set(
    ACCESS_TOKEN_COOKIE_NAME,
    signedValue(accessToken, AUTH_SECRET),
    AUTH_COOKIE_OPTIONS,
  );

  response.cookies.set(
    REFRESH_TOKEN_COOKIE_NAME,
    signedValue(refreshToken, AUTH_SECRET),
    AUTH_COOKIE_OPTIONS,
  );
}
