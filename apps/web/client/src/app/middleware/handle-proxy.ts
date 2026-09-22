import { getLocaleFromPathname, removeLocaleFromPathname } from '$shared/i18n';
import { clearAuthCookieToResponse } from '$shared/lib/cookie/server';

import { handleI18n } from './handle-i18n';
import { handleSession } from './handle-session';
import { createCleanRouteRedirect } from './lib/create-clean-route-redirect';
import { createLocaleRedirect } from './lib/create-locale-redirect';
import { createSignInRedirect } from './lib/create-sign-in-redirect';
import { mergeResponseCookies } from './lib/merge-response-cookies';
import { resolveRouteScope } from './lib/resolve-route-scope';

import type { NextResponse, NextRequest } from 'next/server';

export async function handleProxy(request: NextRequest): Promise<NextResponse> {
  const pathname = request.nextUrl.pathname;

  const locale = getLocaleFromPathname(pathname);
  const normalizedPathname = removeLocaleFromPathname(pathname);

  const scope = resolveRouteScope(normalizedPathname);
  const session = await handleSession(request);

  if (scope === 'private') {
    // private route

    if (session.status === 'anonymous' || session.status === 'invalid') {
      return createSignInRedirect(request);
    }

    if (locale) {
      const response = createCleanRouteRedirect(request, normalizedPathname);
      return mergeResponseCookies(session.response, response);
    }

    return session.response;
  }

  if (!locale) {
    if (session.status !== 'invalid') {
      const response = createLocaleRedirect(request);
      return mergeResponseCookies(session.response, response);
    }
  }

  // public route
  const response = handleI18n(request);

  if (session.status !== 'invalid') {
    return mergeResponseCookies(session.response, response);
  }

  clearAuthCookieToResponse(response);

  return response;
}
