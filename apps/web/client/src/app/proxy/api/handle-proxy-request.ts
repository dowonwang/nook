import {
  clearAuthCookie,
  getAuthAccessFromCookie,
  setAuthCookie,
} from '$shared/api/bff/server';

import { refreshAuthToken } from './refresh-auth-token';
import { requestBackend } from './request-backend';

import type { NextRequest } from 'next/server';

export async function handleProxyRequest(
  request: NextRequest,
): Promise<Response> {
  const accessToken = await getAuthAccessFromCookie();
  let response = await requestBackend(request, accessToken);

  // TODO: 토큰 만료 커스텀 에러 코드 기준으로 리프리쉬 토큰 요청
  if (response.ok) {
    return response;
  }

  const newTokens = await refreshAuthToken(request);

  if (!newTokens) {
    await clearAuthCookie();
    return response;
  }

  await setAuthCookie(newTokens.accessToken, newTokens.refreshToken);
  response = await requestBackend(request, newTokens.accessToken);

  return response;
}
