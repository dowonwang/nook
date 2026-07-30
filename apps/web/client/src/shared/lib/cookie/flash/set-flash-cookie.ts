import { cookies } from 'next/headers';

import {
  FLASH_COOKIE_NAME,
  FLASH_COOKIE_OPTIONS,
} from './flash-cookie-constant';

import type { NextResponse } from 'next/server';

// TODO: 쿠키 삭제 고려해야함
export async function setFlashCookie(message: string): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(FLASH_COOKIE_NAME, message, FLASH_COOKIE_OPTIONS);
}

export function setFlashCookieToResponse(
  response: NextResponse,
  message: string,
): void {
  response.cookies.set(FLASH_COOKIE_NAME, message, FLASH_COOKIE_OPTIONS);
}
