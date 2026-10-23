import { OrganizationReceiveInvitationPage } from '$pages/organization/receive-invitation';

import type { SearchParams } from '$shared/types';

interface Props {
  searchParams: Promise<SearchParams>;
}

export default function Page({ searchParams }: Props) {
  return <OrganizationReceiveInvitationPage searchParams={searchParams} />;
}
