import '@packages/ui/styles.css';

import '$app/styles/global.css';

import { Noto_Sans, Noto_Sans_KR } from 'next/font/google';
import { initServerI18next } from 'next-i18next/server';

import {
  FlashCookieConsumer,
  QueryClientProvider,
  ThemeProvider,
} from '$app/providers';
import { i18nConfig } from '$shared/i18n/server';
import { getFlashCookie, getI18nCookie } from '$shared/lib/cookie/server';
import { initializeTheme } from '$shared/lib/theme';
import { getTheme } from '$shared/lib/theme/get-theme.server';

interface Props {
  children: React.ReactNode;
}
const notoKr = Noto_Sans_KR({
  variable: '--font-noto-sans-kr',
});

const noto = Noto_Sans({
  variable: '--font-noto-sans',
});

initServerI18next(i18nConfig);

export async function AppLayout({ children }: Props) {
  const flashToken = await getFlashCookie();
  const theme = await getTheme();
  const locale = await getI18nCookie();

  return (
    <html
      lang={locale}
      className={`${notoKr.variable} ${noto.variable} ${theme === 'dark' ? 'dark' : ''}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${initializeTheme.toString()})()`,
          }}
        />
      </head>

      <body className='bg-background'>
        <FlashCookieConsumer shouldConsume={!!flashToken} />

        <QueryClientProvider>
          <ThemeProvider initTheme={theme}>{children}</ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
