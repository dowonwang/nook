import '@packages/ui/styles.css';

import './global.css';

import AppHeader from '$components/app-header';
import AppSidebar from '$components/app-sidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <div id='root' className='bg-background flex min-h-dvh'>
          <AppSidebar />
          <div className='flex min-w-0 flex-1 flex-col'>
            <AppHeader />
            <main className='p-4 md:p-6 lg:p-8'>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
