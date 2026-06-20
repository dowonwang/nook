import '@packages/ui/styles.css';

import '$app/styles/global.css';

import { NextIntlClientProvider } from 'next-intl';

interface Props {
  children: React.ReactNode;
}

export function AppLayout({ children }: Props) {
  return (
    <html lang='en'>
      <body className='bg-background'>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
