import { postAuthSignOut } from '@packages/api-client/api';
import { NextResponse } from 'next/server';

import { createForwardedHeaders } from '$shared/api/bff/headers/create-headers';
import {
  clearAuthCookie,
  getAuthRefreshFromCookie,
} from '$shared/api/bff/index.server';

export async function handleSignOutRequest(
  request: Request,
): Promise<NextResponse> {
  const refreshToken = await getAuthRefreshFromCookie();
  const response = NextResponse.json(null, {
    status: 200,
  });

  if (!refreshToken) {
    // 토큰 소유 상관 없이 쿠키 삭제
    clearAuthCookie(response);
    return response;
  }

  const headers = createForwardedHeaders(request);
  await postAuthSignOut(
    {},
    {
      headers: {
        ...headers,
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );

  // 결과 상관없이 쿠키 삭제
  clearAuthCookie(response);
  return response;
}
