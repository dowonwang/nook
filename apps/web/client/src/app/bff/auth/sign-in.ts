import { postAuthSignIn } from '@packages/api-client/api';
import { NextResponse } from 'next/server';

import { setAuthCookie } from '$shared/api/bff';

import type { PostAuthSignInBody } from '@packages/api-client/api';

export async function handleSignInRequest(
  request: Request,
): Promise<NextResponse> {
  const requestBody = (await request.json()) as PostAuthSignInBody;

  const { data, status } = await postAuthSignIn(requestBody);

  if (data.success) {
    const { accessToken, refreshToken, ...rest } = data.data;

    const response = NextResponse.json(
      { ...data, data: { ...rest } },
      {
        status,
      },
    );

    setAuthCookie(response, accessToken, refreshToken);

    return response;
  }

  return NextResponse.json(data, {
    status,
  });
}
