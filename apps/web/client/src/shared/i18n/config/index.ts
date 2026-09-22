import {
  I18N_COOKIE_NAME,
  I18N_FALLBACK_LANGUAGE,
  I18N_LANGUAGES,
} from '$shared/config';

import { resourceBackendServer } from '../server';

import type { I18nConfig } from 'next-i18next/proxy';

export const i18nConfig: I18nConfig = {
  supportedLngs: [...I18N_LANGUAGES],
  fallbackLng: I18N_FALLBACK_LANGUAGE,

  localeInPath: 'internal',
  localeParamName: 'locale',
  cookieName: I18N_COOKIE_NAME,

  use: [resourceBackendServer],

  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
