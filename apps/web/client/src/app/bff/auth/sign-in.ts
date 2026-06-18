import { postAuthSignIn } from '@packages/api-client/api';
import { NextResponse } from 'next/server';

import type { PostAuthSignInBody } from '@packages/api-client/api';

export async function handleSignInRequest(
  request: Request,
): Promise<NextResponse> {
  const requestBody = (await request.json()) as PostAuthSignInBody;

  const { data, headers, status } = await postAuthSignIn(requestBody);

  return NextResponse.json(data, {
    status,
    headers,
  });
}
