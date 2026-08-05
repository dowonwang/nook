import { NextResponse } from 'next/server';

import { SESSION_ERROR_CODE } from '$entities/session';
import { refreshSession } from '$entities/session/server';
import { findErrorCode } from '$shared/api/error';
import {
  getAuthAccessFromCookie,
  setAuthCookieToResponse,
} from '$shared/lib/cookie/server';

import { requestBackend } from './request-backend';

import type { NextRequest } from 'next/server';

export async function handleProxyRequest(
  request: NextRequest,
): Promise<NextResponse> {
  const accessToken = await getAuthAccessFromCookie();
  const response = await requestBackend(request, accessToken);

  if (response.ok) {
    return response;
  }

  const data = (await response.clone().json()) as unknown;
  const errorCode = findErrorCode(data);

  if (errorCode !== SESSION_ERROR_CODE.accessTokenExpired) {
    return response;
  }

  try {
    const newTokens = await refreshSession(request);
    const response = await requestBackend(request, newTokens.accessToken);

    setAuthCookieToResponse(
      response,
      newTokens.accessToken,
      newTokens.refreshToken,
    );

    return response;
  } catch {
    const response = NextResponse.json(
      {
        error: {
          code: SESSION_ERROR_CODE.refreshTokenExpried,
        },
      },
      {
        status: 401,
      },
    );

    return response;
  }
}
