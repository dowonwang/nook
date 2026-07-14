import { postAuthRefresh } from '@packages/api-client/api';

import {
  clearAuthCookie,
  createForwardedHeaders,
  getAuthRefreshFromCookie,
  setAuthCookie,
} from '$shared/api/bff/index.server';

import type { NextResponse } from 'next/server';

export type CookieEffect = (response: NextResponse) => void;

export async function refreshAuthCookie(request: Request): Promise<{
  refreshed: boolean;
  accessToken?: string;
  cookieEffect?: CookieEffect;
}> {
  const refreshToken = await getAuthRefreshFromCookie();

  if (!refreshToken) {
    return {
      refreshed: false,
      cookieEffect(response) {
        clearAuthCookie(response);
      },
    };
  }

  const { data: response, status } = await postAuthRefresh(
    {},
    {
      headers: {
        ...createForwardedHeaders(request),
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );

  console.log('refresh');

  if (status !== 200) {
    return {
      refreshed: false,
      cookieEffect(response) {
        clearAuthCookie(response);
      },
    };
  }

  const { data } = response;

  return {
    refreshed: true,
    accessToken: data.accessToken,
    cookieEffect(response) {
      setAuthCookie(response, data.accessToken, data.refreshToken);
    },
  };
}

export function applyCookieEffect(
  response: NextResponse,
  cookieEffect?: CookieEffect,
): NextResponse {
  if (cookieEffect) {
    cookieEffect(response);
  }

  return response;
}
