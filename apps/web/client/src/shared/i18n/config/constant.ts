export const I18N_LOCALE = ['ko', 'en'] as const;
export const I18N_NAMESPACE = [
  'app',
  'entities',
  'features',
  'pages',
  'shared',
  'widgets',
] as const;
export const I18N_FALLBACK_LOCALE = 'ko';

export type I18nLocale = (typeof I18N_LOCALE)[number];
export type I18nNamespace = (typeof I18N_NAMESPACE)[number];
