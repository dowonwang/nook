import { resourceLoader, resourceLoaderDev } from './resource-loader';

import type { I18nConfig } from 'next-i18next/proxy';

export const i18nConfig: I18nConfig = {
  supportedLngs: ['ko', 'en'],
  fallbackLng: 'ko',
  defaultNS: 'common',
  localeInPath: 'internal',
  localeParamName: 'locale',
  resourceLoader:
    process.env.NODE_ENV === 'development' ? resourceLoaderDev : resourceLoader,
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
