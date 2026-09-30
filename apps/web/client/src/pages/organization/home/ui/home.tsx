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
import { getT } from 'next-i18next/server';

import { MyOrganizationList } from '$features/organization/my-list';
import { serverMyOrganizationListQueryOptions } from '$features/organization/my-list/server';
import { ReceivedOrganizationInvitationList } from '$features/organization-invitation/received-list';
import { serverReceivedOrganizationListQueryOptions } from '$features/organization-invitation/received-list/server';

import { PAGES_ORGANIZATION_HOME_I18N_NAMESPACE } from '../i18n';
import { CreateOrganizationNavigation } from './navigation/create';

export async function OrganizationHomePage() {
  const { t } = await getT(PAGES_ORGANIZATION_HOME_I18N_NAMESPACE);
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(serverMyOrganizationListQueryOptions),
    queryClient.prefetchQuery(serverReceivedOrganizationListQueryOptions),
  ]);

  return (
    <>
      <HeroSection className='mb-6' action={<CreateOrganizationNavigation />}>
        <HeroSectionTitle>{t('hero.title')}</HeroSectionTitle>
        <HeroSectionDescription>{t('hero.description')}</HeroSectionDescription>
      </HeroSection>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <ReceivedOrganizationInvitationList />
        <MyOrganizationList />
      </HydrationBoundary>
    </>
  );
}
