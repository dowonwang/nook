import { NextResponse, type NextRequest } from 'next/server';

import { refreshSession, shouldRefreshSession } from '$entities/session/server';
import {
  createAuthCookieHeader,
  getAuthAccessFromCookie,
  getAuthRefreshFromCookie,
  setAuthCookieToResponse,
} from '$shared/lib/cookie/server';

import type { HandleSessionResult } from './model/type';

export async function handleSession(
  request: NextRequest,
): Promise<HandleSessionResult> {
  try {
    const accessToken = await getAuthAccessFromCookie();
    const refreshToken = await getAuthRefreshFromCookie();

    if (!accessToken && !refreshToken) {
      return {
        status: 'anonymous',
        response: NextResponse.next(),
      };
    }

    if (!shouldRefreshSession(accessToken)) {
      return {
        status: 'valid',
        response: NextResponse.next(),
      };
    }

    const tokens = await refreshSession(request);
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

    setAuthCookieToResponse(response, tokens.accessToken, tokens.refreshToken);
    return {
      status: 'valid',
      response: response,
    };
  } catch {
    return {
      status: 'invalid',
    };
  }
}
