import {
  HeroSection,
  HeroSectionDescription,
  HeroSectionTitle,
} from '@packages/ui/components/hero-section';
import { Separator } from '@packages/ui/components/separator';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { ReceivedOrganizationInvitationList } from '$features/organization-invitation/received-list';
import { serverReceivedOrganizationListQueryOptions } from '$features/organization-invitation/received-list/server';
import { getOffsetPaginationQuery } from '$shared/lib/pagination/get-query.server';

import type { SearchParams } from '$shared/types';

interface Props {
  searchParams: Promise<SearchParams>;
}

export async function OrganizationReceiveInvitationPage({
  searchParams,
}: Props) {
  const queryClient = new QueryClient();
  const pagination = await getOffsetPaginationQuery(searchParams);

  await queryClient.prefetchQuery(
    serverReceivedOrganizationListQueryOptions(pagination),
  );

  return (
    <>
      <HeroSection className='mb-page'>
        <HeroSectionTitle>받은 초대 목록</HeroSectionTitle>
        <HeroSectionDescription>받은 초대 목록입니다.</HeroSectionDescription>
      </HeroSection>

      <Separator className='mb-page' />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <ReceivedOrganizationInvitationList />
      </HydrationBoundary>
    </>
  );
}
