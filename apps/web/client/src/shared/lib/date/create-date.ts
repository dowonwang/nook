import dayjs, { extend } from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/ko';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import { I18N_FALLBACK_LOCALE } from '$shared/i18n';

import type { I18nLocale } from '$shared/i18n';

extend(localizedFormat);

export function createDate(value: dayjs.ConfigType, locale?: I18nLocale) {
  const safeLocale = locale || I18N_FALLBACK_LOCALE;

  return dayjs(value).locale(safeLocale);
}
