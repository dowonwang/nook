import {
  clearAuthCookie,
  createForwardedHeaders,
  getAuthRefreshFromCookie,
  setAuthCookie,
} from '$shared/api/bff';

import type { PostAuthRefresh200 } from '@packages/api-client/api';
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

  const response = await fetch('/api/auth/refresh', {
    method: 'POST',
    headers: {
      ...createForwardedHeaders(request),
      'content-type': 'application/json',
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  if (!response.ok) {
    return {
      refreshed: false,
      cookieEffect(response) {
        clearAuthCookie(response);
      },
    };
  }

  const { data } = (await response.json()) as PostAuthRefresh200;

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
