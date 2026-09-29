import {
  HeroSection,
  HeroSectionDescription,
  HeroSectionTitle,
} from '@packages/ui/components/hero-section';
import { getT } from 'next-i18next/server';

import { CreateOrganizationFlow } from '$widgets/create-organization-flow';

import { PAGE_ORGANIZATION_CREATE_I18N_NAMESPACE } from '../i18n';

export async function CreateOrganizationPage() {
  const { t } = await getT(PAGE_ORGANIZATION_CREATE_I18N_NAMESPACE);

  return (
    <>
      <HeroSection className='mb-6'>
        <HeroSectionTitle>{t('hero.title')}</HeroSectionTitle>
        <HeroSectionDescription>{t('hero.description')}</HeroSectionDescription>
      </HeroSection>

      <CreateOrganizationFlow />
    </>
  );
}
