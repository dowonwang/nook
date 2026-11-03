import {
  HeroSection,
  HeroSectionDescription,
  HeroSectionTitle,
} from '@packages/ui/components/hero-section';
import { Separator } from '@packages/ui/components/separator';
import { getT } from 'next-i18next/server';

import { PAGES_ORGANIZATION_SENT_INVITATION_I18N_NAMESPACE } from '../i18n';

import type { SearchParams } from '$shared/types';

interface Props {
  searchParams: Promise<SearchParams>;
}

export async function OrganizationSentInvitationPage(props: Props) {
  console.log(props);

  const { t } = await getT(PAGES_ORGANIZATION_SENT_INVITATION_I18N_NAMESPACE);

  // const queryClient = new QueryClient();
  // const pagination = await getOffsetPaginationQuery(searchParams);

  return (
    <>
      <HeroSection>
        <HeroSectionTitle>{t('hero.title')}</HeroSectionTitle>
        <HeroSectionDescription>{t('hero.description')}</HeroSectionDescription>
      </HeroSection>

      <Separator />
    </>
  );
}
