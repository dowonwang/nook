import { cookies } from 'next/headers';

import { SERVER_ENV_CONFIG } from '$shared/config/server';
import { signedValue, verifySignedValue } from '$shared/lib/crypto';

import type { NextRequest, NextResponse } from 'next/server';

const ACCESS_TOKEN_COOKIE_NAME = '_auth_access_';
const REFRESH_TOKEN_COOKIE_NAME = '_auth_refresh_';
const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'lax',
  path: '/',
  secure: true,
} as const;

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

export function clearAuthCookieToResponse(response: NextResponse): void {
  response.cookies.delete(ACCESS_TOKEN_COOKIE_NAME);
  response.cookies.delete(REFRESH_TOKEN_COOKIE_NAME);
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.delete(ACCESS_TOKEN_COOKIE_NAME);
  cookieStore.delete(REFRESH_TOKEN_COOKIE_NAME);
}

export async function getAuthAccessFromCookie() {
  const AUTH_SECRET = SERVER_ENV_CONFIG.AUTH_COOKIE_SECRET;

  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!cookieValue) return null;

  return verifySignedValue(cookieValue, AUTH_SECRET);
}

export async function getAuthRefreshFromCookie() {
  const AUTH_SECRET = SERVER_ENV_CONFIG.AUTH_COOKIE_SECRET;

  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(REFRESH_TOKEN_COOKIE_NAME)?.value;

  if (!cookieValue) return null;

  return verifySignedValue(cookieValue, AUTH_SECRET);
}

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
