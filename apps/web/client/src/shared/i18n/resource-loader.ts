import type { I18nConfig } from 'next-i18next/proxy';

type I18nResource = Record<string, unknown>;

interface I18nModule {
  default?: I18nResource;
}

export const resourceLoaderDev: I18nConfig['resourceLoader'] = async (
  locale,
  namespace,
) => {
  if (namespace === 'common') {
    return {};
  }

  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    const resource = await fs.readFile(
      path.resolve(process.cwd(), `src/${namespace}/i18n/${locale}.json`),
      'utf-8',
    );

    return JSON.parse(resource) as I18nResource;
  } catch (error) {
    console.error(
      `Failed to load i18n resource: ${locale}/${namespace}`,
      error,
    );

    return {};
  }
};

export const resourceLoader: I18nConfig['resourceLoader'] = async (
  locale,
  namespace,
) => {
  if (namespace === 'common') {
    return {};
  }

  try {
    const resource = (await import(
      `../../${namespace}/i18n/${locale}.json`
    )) as I18nModule;

    return resource.default ? resource.default : resource;
  } catch (error) {
    console.error(
      `Failed to load i18n resource: ${locale}/${namespace}`,
      error,
    );

    return {};
  }
};
