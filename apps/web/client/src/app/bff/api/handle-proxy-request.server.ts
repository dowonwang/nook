import { NextResponse } from 'next/server';

import { SESSION_ERROR_CODE } from '$entities/session';
import { refreshSession } from '$entities/session/server';
import { isBffRequest } from '$shared/api/bff/server';
import { findErrorCode } from '$shared/api/error';
import {
  getAuthAccessFromCookie,
  setAuthCookieToResponse,
} from '$shared/cookie/server';

import { requestBackend } from './request-backend.server';

import type { NextRequest } from 'next/server';

export async function handleBffRequest(
  request: NextRequest,
): Promise<NextResponse> {
  // clientFetcher / serverFetcher 요청만 허용. 주소창 접근과 다른 사이트의 요청은 404
  if (!isBffRequest(request)) {
    return new NextResponse(null, { status: 404 });
  }

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
          code: SESSION_ERROR_CODE.refreshTokenExpired,
        },
      },
      {
        status: 401,
      },
    );

    return response;
  }
}
