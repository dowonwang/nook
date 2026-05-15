import { AppLayout } from '$app/layouts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
