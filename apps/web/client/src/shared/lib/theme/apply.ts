import { setThemeCookie } from '$shared/cookie';

import type { Theme } from './types';

export function applyTheme(theme: Theme) {
  setThemeCookie(theme);
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.classList.toggle('light', theme === 'light');
}
