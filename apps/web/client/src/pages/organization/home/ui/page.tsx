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
import { getT } from 'next-i18next/server';

import { MyOrganizationList } from '$features/organization/my-list';
import { createServerMyOrganizationListQueryOptions } from '$features/organization/my-list/server';
import { getOffsetPaginationQuery } from '$shared/lib/pagination/get-query.server';

import { PAGES_ORGANIZATION_HOME_I18N_NAMESPACE } from '../i18n';
import { CreateOrganizationNavigation } from './navigation/create';

import type { SearchParams } from '$shared/types';

interface Props {
  searchParams: Promise<SearchParams>;
}

export async function OrganizationHomePage({ searchParams }: Props) {
  const { t } = await getT(PAGES_ORGANIZATION_HOME_I18N_NAMESPACE);
  const queryClient = new QueryClient();
  const pagination = await getOffsetPaginationQuery(searchParams);

  await queryClient.prefetchQuery(
    createServerMyOrganizationListQueryOptions(pagination),
  );

  return (
    <>
      <HeroSection
        className='mb-page'
        action={<CreateOrganizationNavigation />}
      >
        <HeroSectionTitle>{t('hero.title')}</HeroSectionTitle>
        <HeroSectionDescription>{t('hero.description')}</HeroSectionDescription>
      </HeroSection>

      <Separator className='mb-page' />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <MyOrganizationList />
      </HydrationBoundary>
    </>
  );
}
