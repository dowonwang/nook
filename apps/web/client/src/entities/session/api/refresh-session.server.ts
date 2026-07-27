import { postAuthRefresh } from '@packages/api-client/api';

import {
  createForwardedHeaders,
  getAuthRefreshFromCookie,
} from '$shared/api/bff/server';

import type { SessionTokens } from '../model/session';
import type { NextRequest } from 'next/server';

export async function refreshSession(
  request: NextRequest,
): Promise<SessionTokens | null> {
  const refreshToken = await getAuthRefreshFromCookie();

  if (!refreshToken) {
    return null;
  }

  const headers = createForwardedHeaders(request, refreshToken);

  const { data } = await postAuthRefresh(
    {},
    {
      headers,
    },
  );

  if (!data.success) {
    return null;
  }

  const { data: response } = data;

  return {
    accessToken: response.accessToken,
    refreshToken: response.refreshToken,
  };
}
