'use client';

import { I18nProvider as I18NextProvider } from 'next-i18next/client';

import { resourceBackend } from '$shared/i18n';

import type { Resource } from 'i18next';

interface Props {
  children: React.ReactNode;
  locale: string;
  resources: Resource;
}

export function I18nProvider({ children, locale, resources }: Props) {
  return (
    <I18NextProvider
      language={locale}
      resources={resources}
      use={[resourceBackend]}
      ssrBackend
      i18nextOptions={{
        react: {
          useSuspense: true,
        },
      }}
    >
      {children}
    </I18NextProvider>
  );
}
