import { getLocaleFromPathname, removeLocaleFromPathname } from '$shared/i18n';
import { clearAuthCookieToResponse } from '$shared/lib/cookie/server';

import { i18nMiddleware } from './i18n';
import { createCleanRouteRedirect } from './lib/create-clean-route-redirect';
import { createLocaleRedirect } from './lib/create-locale-redirect';
import { createSignInRedirect } from './lib/create-sign-in-redirect';
import { mergeResponseCookies } from './lib/merge-response-cookies';
import { resolveRouteScope } from './lib/resolve-route-scope';
import { sessionMiddleware } from './session';

import type { NextResponse, NextRequest } from 'next/server';

export async function proxyMiddleware(
  request: NextRequest,
): Promise<NextResponse> {
  const pathname = request.nextUrl.pathname;

  const locale = getLocaleFromPathname(pathname);

  const normalizedPathname = removeLocaleFromPathname(pathname);

  const scope = resolveRouteScope(normalizedPathname);
  const session = await sessionMiddleware(request);

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
    const response = createLocaleRedirect(request);

    if (session.status !== 'invalid') {
      return mergeResponseCookies(session.response, response);
    }

    clearAuthCookieToResponse(response);

    return response;
  }

  // public route
  const response = i18nMiddleware(request, locale);

  if (session.status !== 'invalid') {
    return mergeResponseCookies(session.response, response);
  }

  clearAuthCookieToResponse(response);

  return response;
}
