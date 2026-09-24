import type { I18nLanguagesType } from '$shared/config';

export function createLocalizedPathname(
  pathname: string,
  locale: I18nLanguagesType,
): string {
  if (pathname === '/') {
    return `/${locale}`;
  }

  return `/${locale}${pathname}`;
}
