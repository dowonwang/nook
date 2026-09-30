'use client';

import { useT } from 'next-i18next/client';

import { I18N_FALLBACK_LOCALE } from '../config/constant';

import type { I18nLocale } from '../config/constant';

export function useLocale(): I18nLocale {
  const { i18n } = useT();

  return (i18n.resolvedLanguage || I18N_FALLBACK_LOCALE) as I18nLocale;
}
