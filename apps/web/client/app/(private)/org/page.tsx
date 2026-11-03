import { OrganizationHomePage } from '$pages/organization/home/server';

import type { SearchParams } from '$shared/types';

interface Props {
  searchParams: Promise<SearchParams>;
}

export default function Page({ searchParams }: Props) {
  return <OrganizationHomePage searchParams={searchParams} />;
}
