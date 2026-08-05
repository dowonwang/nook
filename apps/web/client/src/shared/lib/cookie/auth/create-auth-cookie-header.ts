import { SERVER_ENV_CONFIG } from '$shared/config/server';
import { signedValue } from '$shared/lib/crypto';

import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from './auth-cookie.constant';

import type { NextRequest } from 'next/server';

export function createAuthCookieHeader(
  request: NextRequest,
  accessToken: string,
  refreshToken: string,
): string {
  const AUTH_SECRET = SERVER_ENV_CONFIG.AUTH_COOKIE_SECRET;

  const requestCookies = new Map(
    request.cookies.getAll().map(({ name, value }) => [name, value]),
  );

  requestCookies.set(
    ACCESS_TOKEN_COOKIE_NAME,
    signedValue(accessToken, AUTH_SECRET),
  );

  requestCookies.set(
    REFRESH_TOKEN_COOKIE_NAME,
    signedValue(refreshToken, AUTH_SECRET),
  );

  return Array.from(requestCookies)
    .map(
      ([name, value]) =>
        `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
    )
    .join('; ');
}
