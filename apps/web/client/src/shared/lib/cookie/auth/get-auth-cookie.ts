import { cookies } from 'next/headers';

import { SERVER_ENV_CONFIG } from '$shared/config/server';
import { verifySignedValue } from '$shared/lib/crypto';

import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from './auth-cookie.constant';

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
