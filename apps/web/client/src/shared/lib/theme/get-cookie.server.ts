import { cookies } from 'next/headers';

import { THEME_STORAGE_KEY } from './constant';

import type { Theme } from './types';

export async function getTheme(): Promise<Theme | null> {
  try {
    const cookieStore = await cookies();
    const theme = cookieStore.get(THEME_STORAGE_KEY)?.value;

    return theme === 'dark' || theme === 'light' ? theme : null;
  } catch {
    return null;
  }
}
