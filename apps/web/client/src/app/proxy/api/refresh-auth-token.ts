import { postAuthRefresh } from '@packages/api-client/api';

import {
  createForwardedHeaders,
  getAuthRefreshFromCookie,
} from '$shared/api/bff/index.server';

import type { NextRequest } from 'next/server';

export async function refreshAuthToken(request: NextRequest): Promise<{
  accessToken: string;
  refreshToken: string;
} | null> {
  const refreshToken = await getAuthRefreshFromCookie();

  if (!refreshToken) {
    return null;
  }

  const headers = createForwardedHeaders(request, refreshToken);

  console.log(headers);

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
