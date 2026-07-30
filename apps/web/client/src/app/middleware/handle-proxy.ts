import { NextResponse } from 'next/server';

import { clearAuthCookieToResponse } from '$shared/api/bff/server';

import { handleSession } from './handle-session';
import { createSignInRedirect } from './lib/create-sign-in-redirect';
import { resolveRouteScope } from './lib/resolve-route-scope';

import type { NextRequest } from 'next/server';

export async function handleProxy(request: NextRequest): Promise<NextResponse> {
  const routeScope = resolveRouteScope(request.nextUrl.pathname);
  const sessionResult = await handleSession(request);

  if (sessionResult.status !== 'invalid') {
    if (routeScope === 'private' && sessionResult.status === 'anonymous') {
      return createSignInRedirect(request);
    }

    return sessionResult.response;
  }

  if (routeScope === 'private') {
    return createSignInRedirect(request);
  }

  const response = NextResponse.next();
  clearAuthCookieToResponse(response);

  return response;
}
