export type { DeepStringify } from './types';
export { createLocalizedPathname } from './lib/create-localized-pathname';
export { getLocaleFromPathname } from './lib/get-locale-from-pathname';
export { removeLocaleFromPathname } from './lib/remove-locale-from-pathname';
export { resourceBackend } from './lib/resource-backend';
export { useLocale } from './lib/use-locale';
export {
  I18N_LOCALE,
  I18N_NAMESPACE,
  I18N_FALLBACK_LOCALE,
} from './config/constant';
export type { I18nLocale, I18nNamespace } from './config/constant';
