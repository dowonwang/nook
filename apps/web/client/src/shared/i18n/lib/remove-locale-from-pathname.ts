import { getLocaleFromPathname } from './get-locale-from-pathname';

export function removeLocaleFromPathname(pathname: string) {
  const locale = getLocaleFromPathname(pathname);

  if (!locale) {
    return pathname;
  }

  const normalizedPathname = pathname.slice(locale.length + 1);

  return normalizedPathname || '/';
}
