export const I18N_LANGUAGES = ['ko', 'en'] as const;
export const I18N_NAMESPACE = [
  'app',
  'entities',
  'features',
  'pages',
  'shared',
  'widgets',
] as const;
export const I18N_COOKIE_NAME = 'i18n-language';
export const I18N_FALLBACK_LANGUAGE = 'ko';

export type I18nLanguagesType = (typeof I18N_LANGUAGES)[number];
export type I18nNamespaceType = (typeof I18N_NAMESPACE)[number];
