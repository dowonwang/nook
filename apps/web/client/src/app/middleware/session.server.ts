import { NextResponse, type NextRequest } from 'next/server';

import {
  refreshSession,
  SessionRefreshRejectedError,
  shouldRefreshSession,
} from '$entities/session/server';
import {
  createAuthCookieHeader,
  getAuthAccessFromCookie,
  getAuthRefreshFromCookie,
  setAuthCookieToResponse,
} from '$shared/cookie/server';

import type { HandleSessionResult } from './model/types';

export async function sessionMiddleware(
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
  } catch (error) {
    // 리프레시 토큰이 없거나 API가 갱신을 거절한 경우만 세션 무효로 보고 쿠키를 지움
    if (error instanceof SessionRefreshRejectedError) {
      return {
        status: 'invalid',
      };
    }

    // API 장애 등은 세션 만료가 아니므로 쿠키를 유지하고 그대로 진행
    return {
      status: 'unavailable',
      response: NextResponse.next(),
    };
  }
}
