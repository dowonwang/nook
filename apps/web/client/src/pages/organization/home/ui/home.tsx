import { Button } from '@packages/ui/components/button';
import {
  HeroSection,
  HeroSectionDescription,
  HeroSectionTitle,
} from '@packages/ui/components/hero-section';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import Link from 'next/link';

import { MyOrganizationList } from '$features/organization/my-list';
import { serverMyOrganizationListQueryOptions } from '$features/organization/my-list/server';
import { ReceivedOrganizationInvitationList } from '$features/organization-invitation/received-list';
import { serverReceivedOrganizationListQueryOptions } from '$features/organization-invitation/received-list/server';

export async function OrganizationHomePage() {
  const queryClient = new QueryClient();

  const [, receivedList] = await Promise.all([
    queryClient.prefetchQuery(serverMyOrganizationListQueryOptions),
    queryClient.fetchQuery(serverReceivedOrganizationListQueryOptions),
  ]);

  return (
    <>
      <HeroSection
        className='mb-6'
        action={
          <Button asChild>
            <Link href={'/org/create'}>Create</Link>
          </Button>
        }
      >
        <HeroSectionTitle>Organization</HeroSectionTitle>
        <HeroSectionDescription>
          Manage team members and their roles
        </HeroSectionDescription>
      </HeroSection>

      <HydrationBoundary state={dehydrate(queryClient)}>
        {receivedList.length > 0 && (
          <section>
            <h2 className='mb-4 text-lg font-semibold'>받은 초대</h2>
            <ReceivedOrganizationInvitationList />
          </section>
        )}

        <section>
          <h2 className='mb-4 text-lg font-semibold'>조직 리스트</h2>
          <MyOrganizationList />
        </section>
      </HydrationBoundary>
    </>
  );
}
