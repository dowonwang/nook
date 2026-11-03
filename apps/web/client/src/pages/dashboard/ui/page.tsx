import {
  HeroSection,
  HeroSectionDescription,
  HeroSectionTitle,
} from '@packages/ui/components/hero-section';
import { Separator } from '@packages/ui/components/separator';
import { getT } from 'next-i18next/server';

import { PAGE_DASHBOARD_I18N_NAMESPACE } from '../i18n';

export async function DashboardPage() {
  const { t } = await getT(PAGE_DASHBOARD_I18N_NAMESPACE);

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
