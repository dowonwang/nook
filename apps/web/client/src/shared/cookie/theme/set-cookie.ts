import { THEME_COOKIE_NAME, THEME_COOKIE_OPTIONS } from './constant';

import type { Theme } from '$shared/lib/theme';

export function setThemeCookie(theme: Theme) {
  document.cookie = `${THEME_COOKIE_NAME}=${theme}; ${THEME_COOKIE_OPTIONS}`;
}
