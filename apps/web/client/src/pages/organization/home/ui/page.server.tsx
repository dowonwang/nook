import {
  dehydrate,
  HydrationBoundary,
  noop,
  QueryClient,
} from '@tanstack/react-query';
import { getT } from 'next-i18next/server';

import {
  HeroSection,
  HeroSectionDescription,
  HeroSectionTitle,
} from '@packages/ui/components/hero-section';
import { Separator } from '@packages/ui/components/separator';

import { serverMyOrganizationListQueryOptions } from '$entities/organization/server';
import { getOffsetPaginationQuery } from '$shared/lib/pagination/server';

import { MyOrganizationList } from './list';
import { CreateOrganizationNavigation } from './navigation/create.server';
import { PAGES_ORGANIZATION_HOME_I18N_NAMESPACE } from '../i18n';

import type { SearchParams } from '$shared/lib/http';

interface Props {
  searchParams: Promise<SearchParams>;
}

export async function OrganizationHomePage({ searchParams }: Props) {
  const { t } = await getT(PAGES_ORGANIZATION_HOME_I18N_NAMESPACE);
  const queryClient = new QueryClient();
  const pagination = await getOffsetPaginationQuery(searchParams);

  await queryClient
    .query(serverMyOrganizationListQueryOptions(pagination))
    .catch(noop);

  return (
    <>
      <HeroSection action={<CreateOrganizationNavigation />}>
        <HeroSectionTitle>{t('hero.title')}</HeroSectionTitle>
        <HeroSectionDescription>{t('hero.description')}</HeroSectionDescription>
      </HeroSection>

      <Separator />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <MyOrganizationList />
      </HydrationBoundary>
    </>
  );
}
