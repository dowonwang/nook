import en from '@packages/i18n/lang/en';
import ko from '@packages/i18n/lang/ko';

import type { I18nLocale } from '$shared/config';

export const defaultI18n: Record<I18nLocale, object> = {
  ko,
  en,
};
