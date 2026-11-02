import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { generateI18nStaticParams } from 'next-i18next/server';

import { I18nProvider } from '$app/providers';
import { serverSessionQueryOptions } from '$entities/session/server';
import { I18N_LOCALE } from '$shared/i18n';
import { Footer } from '$widgets/footer';
import { PublicHeader } from '$widgets/public-header';

import type { I18nLocale } from '$shared/i18n';

interface Props {
  children: React.ReactNode;
  locale: string;
}

export function generateStaticParams() {
  return generateI18nStaticParams();
}

export async function PublicLayout({ children, locale }: Props) {
  if (!I18N_LOCALE.includes(locale as I18nLocale)) {
    redirect('/');
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(serverSessionQueryOptions);

  return (
    <I18nProvider locale={locale} resources={{}}>
      <div id='root' className='flex min-h-dvh flex-col'>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <PublicHeader />
        </HydrationBoundary>

        <main className='container mx-auto flex flex-1 flex-col p-6'>
          {children}
        </main>
        <Footer />
      </div>
    </I18nProvider>
  );
}
