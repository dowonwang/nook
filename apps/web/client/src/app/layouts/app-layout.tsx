import '@packages/ui/styles.css';

import '$app/styles/global.css';

import { NextIntlClientProvider } from 'next-intl';

import { QueryClientProvider } from '$app/providers';

interface Props {
  children: React.ReactNode;
}

export function AppLayout({ children }: Props) {
  return (
    <html lang='en'>
      <body className='bg-background'>
        <QueryClientProvider>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
