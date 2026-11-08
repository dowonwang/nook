import { NextResponse } from 'next/server';

import { SESSION_ERROR_CODE } from '$entities/session';
import {
  refreshSession,
  SessionRefreshRejectedError,
} from '$entities/session/server';
import { isBffRequest } from '$shared/api/bff/server';
import {
  getAuthAccessFromCookie,
  setAuthCookieToResponse,
} from '$shared/cookie/server';

import { requestBackend } from './request-backend.server';
import { createBadGatewayResponse } from '../lib/create-bad-gateway-response.server';
import { readErrorCode } from '../lib/read-error-code.server';

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

  const errorCode = await readErrorCode(response);

  if (errorCode !== SESSION_ERROR_CODE.accessTokenExpired) {
    return response;
  }

  let newTokens: Awaited<ReturnType<typeof refreshSession>>;

  try {
    newTokens = await refreshSession(request);
  } catch (error) {
    // 갱신 요청 자체가 실패한 경우(네트워크 오류 등)는 세션 만료로 보지 않음
    if (!(error instanceof SessionRefreshRejectedError)) {
      return createBadGatewayResponse();
    }

    return NextResponse.json(
      {
        error: {
          code: SESSION_ERROR_CODE.refreshTokenExpired,
        },
      },
      {
        status: 401,
      },
    );
  }

  const retriedResponse = await requestBackend(request, newTokens.accessToken);

  setAuthCookieToResponse(
    retriedResponse,
    newTokens.accessToken,
    newTokens.refreshToken,
  );

  return retriedResponse;
}
