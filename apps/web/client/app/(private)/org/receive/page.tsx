import { OrganizationReceiveInvitationPage } from '$pages/organization/receive-invitation/server';

import type { SearchParams } from '$shared/lib/http';

interface Props {
  searchParams: Promise<SearchParams>;
}

export default function Page({ searchParams }: Props) {
  return <OrganizationReceiveInvitationPage searchParams={searchParams} />;
}
