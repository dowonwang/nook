import { getAuthMe } from '@packages/api-client/api';
import { NextResponse } from 'next/server';

import {
  applyCookieEffect,
  bffWrapper,
  clearAuthCookie,
  getAuthAccessFromCookie,
} from '$shared/api/bff/index.server';

export async function handleMeRequest(request: Request) {
  if (!(await getAuthAccessFromCookie())) {
    const response = NextResponse.json(
      {},
      {
        status: 401,
      },
    );

    clearAuthCookie(response);

    return response;
  }

  const { result, cookieEffect } = await bffWrapper({
    request,
    authenticated: true,
    call: (headers) => getAuthMe({ headers }),
  });

  return applyCookieEffect(
    NextResponse.json(result.data, {
      status: result.status,
    }),
    cookieEffect,
  );
}
