import { NextResponse, type NextRequest } from 'next/server';

import { createLocalizedPathname } from '$shared/i18n';
import { resolveRequestLocale } from '$shared/i18n/server';

export function createLocaleRedirect(request: NextRequest) {
  const locale = resolveRequestLocale(request);

  const url = request.nextUrl.clone();
  url.pathname = createLocalizedPathname(request.nextUrl.pathname, locale);

  const response = NextResponse.redirect(url, 308);

  return response;
}
