import { AppLayout } from '$app/layouts';
import { QueryClientProvider } from '$app/providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider>
      <AppLayout>{children}</AppLayout>
    </QueryClientProvider>
  );
}
