import { cookies } from 'next/headers';

import { THEME_STORAGE_KEY } from '$shared/config';

import type { Theme } from '$shared/config';

export async function getTheme(): Promise<Theme> {
  try {
    const cookieStore = await cookies();
    const theme = cookieStore.get(THEME_STORAGE_KEY)?.value;

    return theme === 'dark' || theme === 'light' ? theme : 'light';
  } catch {
    return 'light';
  }
}
