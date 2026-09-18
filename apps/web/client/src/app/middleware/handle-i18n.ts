import { createProxy } from 'next-i18next/proxy';

import { i18nConfig } from '$shared/i18n/server';

import type { NextRequest } from 'next/server';

const i18nMiddleware = createProxy(i18nConfig);

export function handleI18n(request: NextRequest) {
  return i18nMiddleware(request);
}
