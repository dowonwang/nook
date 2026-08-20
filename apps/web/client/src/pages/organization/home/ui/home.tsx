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

export async function OrganizationHomePage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(serverMyOrganizationListQueryOptions);

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
        <MyOrganizationList />
      </HydrationBoundary>
    </>
  );
}
