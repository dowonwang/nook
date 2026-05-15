import '@packages/ui/styles.css';

import '$app/styles/global.css';

interface Props {
  children: React.ReactNode;
}

export function AppLayout({ children }: Props) {
  return (
    <html lang='en'>
      <body className='bg-background'>{children}</body>
    </html>
  );
}
