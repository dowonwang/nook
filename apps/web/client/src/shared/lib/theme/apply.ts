import type { Theme } from '$shared/config';

export function applyTheme(theme: Theme) {
  document.cookie =
    'theme=' + theme + '; Path=/; Max-Age=31536000; SameSite=Lax';
  document.documentElement.classList.toggle('dark', theme === 'dark');
}
