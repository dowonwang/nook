import { cookies } from 'next/headers';

import { THEME_COOKIE_NAME } from './constant';

import type { Theme } from '$shared/lib/theme';

export async function getThemeCookie(): Promise<Theme | null> {
  try {
    const cookieStore = await cookies();
    const theme = cookieStore.get(THEME_COOKIE_NAME)?.value;

    return theme === 'dark' || theme === 'light' ? theme : null;
  } catch {
    return null;
  }
}
