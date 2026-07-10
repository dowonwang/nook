import { postAuthSignIn } from '@packages/api-client/api';
import { NextResponse } from 'next/server';

import {
  applyCookieEffect,
  bffWrapper,
  setAuthCookie,
} from '$shared/api/bff/index.server';

import type { PostAuthSignInBody } from '@packages/api-client/api';

export async function handleSignInRequest(
  request: Request,
): Promise<NextResponse> {
  const requestBody = (await request.json()) as PostAuthSignInBody;

  const { result, cookieEffect } = await bffWrapper({
    request,
    authenticated: false,
    call: (headers) =>
      postAuthSignIn(requestBody, {
        headers,
      }),
  });

  const { data, status } = result;

  if (data.success) {
    const { accessToken, refreshToken, ...rest } = data.data;

    const response = NextResponse.json(
      { ...data, data: { ...rest } },
      {
        status,
      },
    );

    setAuthCookie(response, accessToken, refreshToken);

    return applyCookieEffect(response, cookieEffect);
  }

  return applyCookieEffect(
    NextResponse.json(data, {
      status,
    }),
    cookieEffect,
  );
}
