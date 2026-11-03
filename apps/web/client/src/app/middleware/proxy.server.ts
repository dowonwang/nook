import { getLocaleFromPathname, removeLocaleFromPathname } from '$shared/i18n';
import { clearAuthCookieToResponse } from '$shared/lib/cookie/server';

import { i18nMiddleware } from './i18n.server';
import { createCleanRouteRedirect } from './lib/create-clean-route-redirect.server';
import { createLocaleRedirect } from './lib/create-locale-redirect.server';
import { createSignInRedirect } from './lib/create-sign-in-redirect.server';
import { mergeResponseCookies } from './lib/merge-response-cookies.server';
import { resolveRouteScope } from './lib/resolve-route-scope';
import { sessionMiddleware } from './session.server';

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
