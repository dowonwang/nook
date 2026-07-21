import { cookies } from 'next/headers';

const FLASH_COOKIE_NAME = '_flash_';

// TODO: 쿠키 삭제 고려해야함
export async function setFlashCookie(message: string) {
  const cookieStore = await cookies();

  cookieStore.set(FLASH_COOKIE_NAME, message, {
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
