import { PublicLayout } from '$app/layouts/server';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}) {
  const { locale } = await params;

  return <PublicLayout locale={locale}>{children}</PublicLayout>;
}
