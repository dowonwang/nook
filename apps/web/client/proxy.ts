import { NextResponse } from 'next/server';

import { refreshSessionCookieIfNeeded } from '$app/middleware';
import {
  createAuthCookieHeader,
  setAuthCookie,
} from '$shared/api/bff/cookies/auth-cookie';

import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const tokens = await refreshSessionCookieIfNeeded(request);

  if (!tokens) {
    return NextResponse.next();
  }

  const requestHeaders = new Headers(request.headers);

  requestHeaders.set(
    'cookie',
    createAuthCookieHeader(request, tokens.accessToken, tokens.refreshToken),
  );

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  setAuthCookie(tokens.accessToken, tokens.refreshToken, response);

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
