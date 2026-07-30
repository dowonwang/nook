import { postAuthRefresh } from '@packages/api-client/api';

import {
  createForwardedHeaders,
  getAuthRefreshFromCookie,
} from '$shared/api/bff/server';

import type { SessionTokens } from '../model/session';
import type { NextRequest } from 'next/server';

export async function refreshSession(
  request: NextRequest,
): Promise<SessionTokens> {
  const refreshToken = await getAuthRefreshFromCookie();

  if (!refreshToken) {
    throw new Error('Refresh Token is required.');
  }

  const headers = createForwardedHeaders(request, refreshToken);

  const { data } = await postAuthRefresh(
    {},
    {
      headers: Object.fromEntries(headers.entries()),
    },
  );

  if (!data.success) {
    throw new Error('Token refresh failed.');
  }

  const { data: response } = data;

  return {
    accessToken: response.accessToken,
    refreshToken: response.refreshToken,
  };
}
