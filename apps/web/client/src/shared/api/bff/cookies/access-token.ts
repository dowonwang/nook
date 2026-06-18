import type { NextResponse } from 'next/server';

export function setAccessTokenCookie(
  response: NextResponse,
  accessToken: string,
) {
  response.cookies.set('access_token', accessToken, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: true,
  });
}
