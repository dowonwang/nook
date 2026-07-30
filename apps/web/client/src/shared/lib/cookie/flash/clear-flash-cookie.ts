import { cookies } from 'next/headers';

import { FLASH_COOKIE_NAME } from './flash-cookie-constant';

import type { NextResponse } from 'next/server';

export async function clearFlashCookie(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.delete(FLASH_COOKIE_NAME);
}

export function clearFlashCookieToResponse(response: NextResponse): void {
  response.cookies.delete(FLASH_COOKIE_NAME);
}
