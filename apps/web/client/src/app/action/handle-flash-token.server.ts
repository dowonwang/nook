import { NextResponse } from 'next/server';

import { isBffRequest } from '$shared/api/bff/server';
import {
  clearFlashCookieToResponse,
  getFlashCookie,
} from '$shared/cookie/server';

import type { NextRequest } from 'next/server';

export async function handleFlashToken(
  request: NextRequest,
): Promise<NextResponse> {
  if (!isBffRequest(request)) {
    return new NextResponse(null, { status: 404 });
  }

  const flashToken = await getFlashCookie();
  const response = new NextResponse(null, {
    status: 204,
  });

  if (!flashToken) {
    return response;
  }

  clearFlashCookieToResponse(response);

  return response;
}
