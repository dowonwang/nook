import {
  postAuthSignUp,
  type PostAuthSignUpBody,
} from '@packages/api-client/api';
import { NextResponse } from 'next/server';

import { applyCookieEffect, bffWrapper } from '$shared/api/bff/index.server';

export async function handleSignUpRequest(
  request: Request,
): Promise<NextResponse> {
  const requestBody = (await request.json()) as PostAuthSignUpBody;

  const { result, cookieEffect } = await bffWrapper({
    request,
    authenticated: false,
    call: (headers) => postAuthSignUp(requestBody, { headers }),
  });

  const { data, status } = result;

  return applyCookieEffect(
    NextResponse.json(data, {
      status,
    }),
    cookieEffect,
  );
}
