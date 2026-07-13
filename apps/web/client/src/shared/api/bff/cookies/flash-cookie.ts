import { cookies } from 'next/headers';

import type { NextResponse } from 'next/server';

const FLASH_COOKIE_NAME = '_flash_';

export function setFlashCookie(response: NextResponse, message: string) {
  response.cookies.set(FLASH_COOKIE_NAME, message, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: true,
    maxAge: 10,
  });
}

export async function getFlashCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(FLASH_COOKIE_NAME)?.value;

  return cookieValue;
}
