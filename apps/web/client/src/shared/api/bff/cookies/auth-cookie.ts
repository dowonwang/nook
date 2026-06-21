import { cookies } from 'next/headers';

import { SERVER_ENV_CONFIG } from '$shared/config/server-env';

import { signedCookie, verifySignedCookie } from './cookie-sign';

import type { NextResponse } from 'next/server';

const AUTH_COOKIE_NAME = '_auth_';

export function setAuthCookie(response: NextResponse, accessToken: string) {
  const AUTH_SECRET = SERVER_ENV_CONFIG.AUTH_COOKIE_SECRET;

  response.cookies.set(
    AUTH_COOKIE_NAME,
    signedCookie(accessToken, AUTH_SECRET),
    {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: true,
    },
  );
}

export function clearAuthCookie(response: NextResponse) {
  response.cookies.delete(AUTH_COOKIE_NAME);
}

export async function getAuthTokenFromCookie() {
  const AUTH_SECRET = SERVER_ENV_CONFIG.AUTH_COOKIE_SECRET;

  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!cookieValue) return null;

  return verifySignedCookie(cookieValue, AUTH_SECRET);
}
