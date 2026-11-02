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

import { serverReceivedOrganizationListQueryOptions } from '$entities/organization-invitation/server';
import { getOffsetPaginationQuery } from '$shared/lib/pagination/server';

import { ReceivedOrganizationInvitationList } from './list';
import { PAGES_ORGANIZATION_RECEIVE_INVITATION_I18N_NAMESPACE } from '../i18n';

import type { SearchParams } from '$shared/types';

interface Props {
  searchParams: Promise<SearchParams>;
}

export async function OrganizationReceiveInvitationPage({
  searchParams,
}: Props) {
  const queryClient = new QueryClient();
  const pagination = await getOffsetPaginationQuery(searchParams);
  const { t } = await getT(
    PAGES_ORGANIZATION_RECEIVE_INVITATION_I18N_NAMESPACE,
  );

  await queryClient.prefetchQuery(
    serverReceivedOrganizationListQueryOptions(pagination),
  );

  return (
    <>
      <HeroSection className='mb-page'>
        <HeroSectionTitle>{t('hero.title')}</HeroSectionTitle>
        <HeroSectionDescription>{t('hero.description')}</HeroSectionDescription>
      </HeroSection>

      <Separator className='mb-page' />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <ReceivedOrganizationInvitationList />
      </HydrationBoundary>
    </>
  );
}
