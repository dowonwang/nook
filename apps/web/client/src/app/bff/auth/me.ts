import { getAuthMe } from '@packages/api-client/api';
import { NextResponse } from 'next/server';

import {
  applyCookieEffect,
  bffWrapper,
  getAuthAccessFromCookie,
} from '$shared/api/bff';

export async function handleMeRequest(request: Request) {
  if (!(await getAuthAccessFromCookie())) {
    return NextResponse.json(
      {},
      {
        status: 401,
      },
    );
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
