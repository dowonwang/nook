'use client';

import { Button } from '@packages/ui/components/button';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from '@packages/ui/components/card';
import { Separator } from '@packages/ui/components/separator';
import { useQuery } from '@tanstack/react-query';
import { useT } from 'next-i18next/client';

import { OrganizationMemberRoleBadge } from '$entities/organization-member/ui/role-badge';

import { FEAT_ORGANIZATION_MY_LIST_I18N_NAMESPACE } from '../i18n';
import { myOrganizationListQueryOptions } from '../model/query';

export function MyOrganizationList() {
  const { t } = useT(FEAT_ORGANIZATION_MY_LIST_I18N_NAMESPACE);
  const { data: organizations } = useQuery(myOrganizationListQueryOptions);

  return (
    <section>
      <h2 className='mb-4 text-lg font-semibold'>{t('title')}</h2>

      <div className='grid grid-cols-3 gap-4'>
        {organizations?.map((organization) => (
          <Card key={organization.id}>
            <CardHeader className='flex items-center justify-between'>
              <CardTitle level='h3'>{organization.title}</CardTitle>
              <OrganizationMemberRoleBadge role={organization.userRole} />
            </CardHeader>

            <CardBody>
              <p>
                {t('card.member_count')}: {organization.memberCount}
              </p>

              <Separator className='my-4' />

              <Button size='small' className='ml-auto block'>
                {t('button.detail')}
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
}
