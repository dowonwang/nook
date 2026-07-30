import '@packages/ui/styles.css';

import '$app/styles/global.css';

import { NextIntlClientProvider } from 'next-intl';

import { FlashCookieConsumer, QueryClientProvider } from '$app/providers';
import { getFlashCookie } from '$shared/lib/cookie/server';

interface Props {
  children: React.ReactNode;
}

export async function AppLayout({ children }: Props) {
  const flashToken = await getFlashCookie();

  return (
    <html lang='en'>
      <body className='bg-background'>
        <FlashCookieConsumer shouldConsume={!!flashToken} />

        <QueryClientProvider>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
