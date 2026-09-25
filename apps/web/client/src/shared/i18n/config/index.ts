import { I18N_FALLBACK_LOCALE, I18N_LOCALE } from '$shared/config';
import { I18N_COOKIE_NAME } from '$shared/lib/cookie';

import { resourceBackendServer, resourceBackendServerDev } from '../server';

import type { I18nConfig } from 'next-i18next/proxy';

export const i18nConfig: I18nConfig = {
  supportedLngs: [...I18N_LOCALE],
  fallbackLng: I18N_FALLBACK_LOCALE,

  localeInPath: 'internal',
  localeParamName: 'locale',
  cookieName: I18N_COOKIE_NAME,

  use: [
    process.env.NODE_ENV === 'development'
      ? resourceBackendServerDev
      : resourceBackendServer,
  ],

  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
