import { OrganizationSentInvitationPage } from '$pages/organization/sent-invitation/server';

import type { SearchParams } from '$shared/lib/http';

interface Props {
  searchParams: Promise<SearchParams>;
}

export default function Page({ searchParams }: Props) {
  return <OrganizationSentInvitationPage searchParams={searchParams} />;
}
