import { i18nKo } from '$shared/i18n/ko';

import type { I18nKoKey } from '$shared/i18n/ko';

export type I18nLocale = 'ko';
export type I18nKey = I18nKoKey;

const i18nContexts = {
  ko: i18nKo,
} satisfies Record<I18nLocale, Record<string, string>>;

export function translateI18n(key: I18nKey, locale: I18nLocale) {
  return i18nContexts[locale][key];
}
