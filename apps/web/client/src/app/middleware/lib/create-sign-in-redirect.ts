import { NextResponse, type NextRequest } from 'next/server';

import { SESSION_REQUIRED_SIGN_IN } from '$entities/session';
import {
  clearAuthCookieToResponse,
  setFlashCookieToResponse,
} from '$shared/api/bff/server';
import { APP_CONSTANT } from '$shared/config';

export function createSignInRedirect(request: NextRequest) {
  const signInUrl = new URL('/signin', request.url);

  signInUrl.searchParams.set(
    APP_CONSTANT.redirectQueryKey,
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
  );

  const response = NextResponse.redirect(signInUrl);

  clearAuthCookieToResponse(response);
  setFlashCookieToResponse(response, SESSION_REQUIRED_SIGN_IN);

  return response;
}
