import { bffFetcher, toNextResponse } from '$shared/api/bff';

import type { postAuthSignInResponse } from '@packages/api-client/api';
import type { NextResponse } from 'next/server';

export async function POST(
  request: Request,
): Promise<NextResponse<postAuthSignInResponse>> {
  const response = await bffFetcher({
    path: '/auth/sign-in',
    method: 'POST',
    requestHeaders: request.headers,
    body: {
      type: 'json',
      value: await request.json(),
    },
  });

  return await toNextResponse<postAuthSignInResponse>(response);
}
