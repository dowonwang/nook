import { AppLayout } from '$app/layouts/server';

export { metadata } from '$app/layouts/server';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
