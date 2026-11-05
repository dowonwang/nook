import { postAuthRefresh } from '@packages/api-client/api';

import { createForwardedHeaders } from '$shared/api/bff/server';
import { getAuthRefreshFromCookie } from '$shared/lib/cookie/server';

import type { SessionTokens } from '../model/types';
import type { NextRequest } from 'next/server';

// 리프레시 토큰이 없거나 API가 갱신을 거절한 경우. 네트워크 오류 등 그 외 실패와 구분하는 데 사용
export class SessionRefreshRejectedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SessionRefreshRejectedError';
  }
}

export async function refreshSession(
  request: NextRequest,
): Promise<SessionTokens> {
  const refreshToken = await getAuthRefreshFromCookie();

  if (!refreshToken) {
    throw new SessionRefreshRejectedError('Refresh Token is required.');
  }

  const headers = createForwardedHeaders(request, refreshToken);

  const { data } = await postAuthRefresh(
    {},
    {
      headers: Object.fromEntries(headers.entries()),
    },
  );

  if (!data.success) {
    throw new SessionRefreshRejectedError('Token refresh failed.');
  }

  const { data: response } = data;

  return {
    accessToken: response.accessToken,
    refreshToken: response.refreshToken,
  };
}
