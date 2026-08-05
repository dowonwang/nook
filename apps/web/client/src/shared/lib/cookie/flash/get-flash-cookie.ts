import { cookies } from 'next/headers';

import { FLASH_COOKIE_NAME } from './flash-cookie-constant';

export async function getFlashCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(FLASH_COOKIE_NAME)?.value;

  return cookieValue;
}
