export function initializeTheme() {
  try {
    if (!document.cookie.includes('theme=')) {
      const theme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

      document.cookie =
        'theme=' + theme + '; Path=/; Max-Age=31536000; SameSite=Lax';

      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  } catch {
    return;
  }
}
