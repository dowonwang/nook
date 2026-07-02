import { getAuthMe } from '@packages/api-client/api';
import { NextResponse } from 'next/server';

import { applyCookieEffect, bffWrapper } from '$shared/api/bff';

export async function handleMeRequest(request: Request) {
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
