import { NextResponse } from 'next/server';

import {
  clearFlashCookieToResponse,
  getFlashCookie,
} from '$shared/lib/cookie/server';

export async function handleFlashToken(): Promise<NextResponse> {
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
