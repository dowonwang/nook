import { OrganizationDetailPage } from '$pages/organization/detail';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  return <OrganizationDetailPage slug={slug} />;
}
