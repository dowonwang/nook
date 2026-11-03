import { OrganizationSentInvitationPage } from '$pages/organization/sent-invitation/server';

import type { SearchParams } from '$shared/types';

interface Props {
  searchParams: Promise<SearchParams>;
}

export default function Page({ searchParams }: Props) {
  return <OrganizationSentInvitationPage searchParams={searchParams} />;
}
