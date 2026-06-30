import { cookies } from 'next/headers';

import { SERVER_ENV_CONFIG } from '$shared/config/server-env';

import { signedCookie, verifySignedCookie } from './cookie-sign';

import type { NextResponse } from 'next/server';

const ACCESS_TOKEN_COOKIE_NAME = '_auth_access_';
const REFRESH_TOKEN_COOKIE_NAME = '_auth_refresh_';

export function setAuthCookie(
  response: NextResponse,
  accessToken: string,
  refreshToken: string,
) {
  const AUTH_SECRET = SERVER_ENV_CONFIG.AUTH_COOKIE_SECRET;

  response.cookies.set(
    ACCESS_TOKEN_COOKIE_NAME,
    signedCookie(accessToken, AUTH_SECRET),
    {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: true,
    },
  );

  response.cookies.set(
    REFRESH_TOKEN_COOKIE_NAME,
    signedCookie(refreshToken, AUTH_SECRET),
    {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: true,
    },
  );
}

export function clearAuthCookie(response: NextResponse) {
  response.cookies.delete(ACCESS_TOKEN_COOKIE_NAME);
  response.cookies.delete(REFRESH_TOKEN_COOKIE_NAME);
}

export async function getAuthAccessFromCookie() {
  const AUTH_SECRET = SERVER_ENV_CONFIG.AUTH_COOKIE_SECRET;

  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!cookieValue) return null;

  return verifySignedCookie(cookieValue, AUTH_SECRET);
}

export async function getAuthRefreshFromCookie() {
  const AUTH_SECRET = SERVER_ENV_CONFIG.AUTH_COOKIE_SECRET;

  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(REFRESH_TOKEN_COOKIE_NAME)?.value;

  if (!cookieValue) return null;

  return verifySignedCookie(cookieValue, AUTH_SECRET);
}
