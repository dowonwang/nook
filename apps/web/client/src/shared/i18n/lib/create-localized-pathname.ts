import type { I18nLocale } from '$shared/config';

export function createLocalizedPathname(
  pathname: string,
  locale: I18nLocale,
): string {
  if (pathname === '/') {
    return `/${locale}`;
  }

  return `/${locale}${pathname}`;
}
