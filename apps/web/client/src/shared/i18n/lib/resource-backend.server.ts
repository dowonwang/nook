import resourcesToBackend from 'i18next-resources-to-backend';

import { I18N_LOCALE, I18N_NAMESPACE } from '$shared/config';

import { defaultI18n } from '../config/default';

import type { I18nLocale } from '$shared/config';
import type { Module } from 'i18next';

export const resourceBackendServer = resourcesToBackend(
  async (lng: string, ns: string) => {
    if (ns === 'common') {
      if (!I18N_LOCALE.includes(lng as I18nLocale)) {
        return {};
      }

      return defaultI18n[lng as I18nLocale];
    }

    try {
      if (
        !I18N_LOCALE.includes(lng as I18nLocale) ||
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

export const resourceBackendServerDev = resourcesToBackend(
  async (lng: string, ns: string) => {
    if (ns === 'common') {
      if (!I18N_LOCALE.includes(lng as I18nLocale)) {
        return {};
      }

      return defaultI18n[lng as I18nLocale];
    }

    try {
      if (
        !I18N_LOCALE.includes(lng as I18nLocale) ||
        !I18N_NAMESPACE.some((namespace) => ns.startsWith(namespace))
      ) {
        return {};
      }

      const fs = await import('fs/promises');
      const path = await import('path');

      const resource = await fs.readFile(
        path.resolve(process.cwd(), `src/${ns}/i18n/${lng}.json`),
        'utf-8',
      );

      return JSON.parse(resource) as Record<string, unknown>;
    } catch (error) {
      console.error(error);
      return {};
    }
  },
);
