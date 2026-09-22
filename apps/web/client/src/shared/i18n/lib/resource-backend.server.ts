import resourcesToBackend from 'i18next-resources-to-backend';

import { I18N_LANGUAGES, I18N_NAMESPACE } from '$shared/config';

import { defaultI18n } from '../config/default';

import type { I18nLanguagesType } from '$shared/config';
import type { Module } from 'i18next';

export const resourceBackendServer = resourcesToBackend(
  async (lng: string, ns: string) => {
    if (ns === 'common') {
      if (!I18N_LANGUAGES.includes(lng as I18nLanguagesType)) {
        return {};
      }

      return defaultI18n[lng as I18nLanguagesType];
    }

    try {
      if (
        !I18N_LANGUAGES.includes(lng as I18nLanguagesType) ||
        !I18N_NAMESPACE.some((namespace) => ns.startsWith(namespace))
      ) {
        return {};
      }

      const resource = (await import(
        `../../../${ns}/i18n/${lng}.json`
      )) as Module;

      return resource;
    } catch (error) {
      console.error(error);
      return {};
    }
  },
);
