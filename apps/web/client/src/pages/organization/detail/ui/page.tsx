import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from '@packages/ui/components/card';
import {
  HeroSection,
  HeroSectionDescription,
  HeroSectionTitle,
} from '@packages/ui/components/hero-section';
import { Separator } from '@packages/ui/components/separator';
import { Users2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getT } from 'next-i18next/server';

import { OrganizationMemberRoleBadge } from '$entities/organization-member';

import { getOrganizationBySlugServer } from '../api/get-organization.server';
import { PAGES_ORGANIZATION_DETAIL_I18N_NAMESPACE } from '../i18n';

const tw = String.raw;
const DL_ITEM_STYLE = tw`[&>dt]:text-secondary-foreground space-y-2 [&>dt]:text-sm [&>dt]:font-semibold`;

interface Props {
  slug: string;
}

export async function OrganizationDetailPage({ slug }: Props) {
  const { t } = await getT(PAGES_ORGANIZATION_DETAIL_I18N_NAMESPACE);
  const organization = await getOrganizationBySlugServer(slug);

  // 없는 조직이거나 소속되지 않은 조직
  if (!organization) {
    notFound();
  }

  return (
    <>
      <HeroSection className='mb-page'>
        <HeroSectionTitle>{organization.title}</HeroSectionTitle>
        <HeroSectionDescription>{t('hero.description')}</HeroSectionDescription>
      </HeroSection>

      <Separator className='mb-page' />

      <Card isArticle>
        <CardHeader>
          <CardTitle level='h2'>{t('info.title')}</CardTitle>
        </CardHeader>

        <CardBody>
          <dl className='grid grid-cols-1 gap-6 md:grid-cols-3'>
            <div className={DL_ITEM_STYLE}>
              <dt>{t('info.role')}</dt>
              <dd>
                <OrganizationMemberRoleBadge role={organization.userRole} />
              </dd>
            </div>

            <div className={DL_ITEM_STYLE}>
              <dt>{t('info.member_count')}</dt>
              <dd className='flex items-center gap-2'>
                <Users2 className='w-5' />
                {organization.memberCount}
              </dd>
            </div>

            <div className={DL_ITEM_STYLE}>
              <dt>{t('info.address')}</dt>
              <dd className='font-mono text-sm'>
                /org/detail/{organization.slug}
              </dd>
            </div>
          </dl>
        </CardBody>
      </Card>
    </>
  );
}
