import { SESSION_ERROR_CODE } from '$entities/session';
import { refreshSession } from '$entities/session/server';
import {
  clearAuthCookie,
  getAuthAccessFromCookie,
  setAuthCookie,
} from '$shared/api/bff/server';
import { findErrorCode } from '$shared/api/error';

import { requestBackend } from './request-backend';

import type { NextRequest } from 'next/server';

export async function handleProxyRequest(
  request: NextRequest,
): Promise<Response> {
  const accessToken = await getAuthAccessFromCookie();
  let response = await requestBackend(request, accessToken);

  if (response.ok) {
    return response;
  }

  const data = (await response.clone().json()) as unknown;
  const errorCode = findErrorCode(data);

  if (errorCode !== SESSION_ERROR_CODE.accessTokenExpired) {
    return response;
  }

  const newTokens = await refreshSession(request);

  if (!newTokens) {
    await clearAuthCookie();
    return response;
  }

  await setAuthCookie(newTokens.accessToken, newTokens.refreshToken);
  response = await requestBackend(request, newTokens.accessToken);

  return response;
}
