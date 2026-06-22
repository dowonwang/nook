import { getRequestConfig } from 'next-intl/server';

import type { AbstractIntlMessages } from 'next-intl';

const locales = ['ko'] as const;
type Locale = (typeof locales)[number];

type MessageModule = {
  default: AbstractIntlMessages;
};

const loadMessages = {
  ko: async () => {
    const mod: MessageModule = await import('@packages/i18n/lang/ko');
    return mod.default;
  },
} satisfies Record<Locale, () => Promise<AbstractIntlMessages>>;

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;

  const locale: Locale = locales.includes(requestedLocale as Locale)
    ? (requestedLocale as Locale)
    : 'ko';

  return {
    locale,
    messages: await loadMessages[locale](),
  };
});
