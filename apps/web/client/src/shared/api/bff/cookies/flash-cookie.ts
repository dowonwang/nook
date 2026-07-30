import { cookies } from 'next/headers';

import type { NextResponse } from 'next/server';

const FLASH_COOKIE_NAME = '_flash_';
const FLASH_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'lax',
  path: '/',
  secure: true,
  maxAge: 10,
} as const;

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

export async function getFlashCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(FLASH_COOKIE_NAME)?.value;

  return cookieValue;
}

export async function clearFlashCookie(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.delete(FLASH_COOKIE_NAME);
}

export function clearFlashCookieToResponse(response: NextResponse): void {
  response.cookies.delete(FLASH_COOKIE_NAME);
}
