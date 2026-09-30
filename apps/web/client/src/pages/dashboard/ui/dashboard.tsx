import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@packages/ui/components/card';
import {
  HeroSection,
  HeroSectionDescription,
  HeroSectionTitle,
} from '@packages/ui/components/hero-section';
import { Separator } from '@packages/ui/components/separator';
import { getT } from 'next-i18next/server';

import { PAGE_DASHBOARD_I18N_NAMESPACE } from '../i18n';

const tw = String.raw;

export async function DashboardPage() {
  const { t } = await getT(PAGE_DASHBOARD_I18N_NAMESPACE);
  const HEAD_STYLE = tw`mb-6 text-xl`;

  return (
    <>
      <HeroSection className='mb-6'>
        <HeroSectionTitle>{t('hero.title')}</HeroSectionTitle>
        <HeroSectionDescription>{t('hero.description')}</HeroSectionDescription>
      </HeroSection>

      <Separator className='my-6' />

      <section>
        <h2 className={HEAD_STYLE}>{t('todo.title')}</h2>

        <Card>
          <CardHeader>
            <CardTitle>{t('todo.organization.title')}</CardTitle>
            <CardDescription>
              {t('todo.organization.description')}
            </CardDescription>
          </CardHeader>

          <CardBody>
            <ul className='ml-4 list-disc'></ul>
          </CardBody>
        </Card>
      </section>
    </>
  );
}
