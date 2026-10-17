'use client';

import { Button } from '@packages/ui/components/button';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from '@packages/ui/components/card';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from '@packages/ui/components/select';
import { Separator } from '@packages/ui/components/separator';
import { useQuery } from '@tanstack/react-query';
import { useT } from 'next-i18next/client';
import { useState } from 'react';

import { OrganizationMemberRoleBadge } from '$entities/organization-member/ui/role-badge';
import { useOffsetQuery } from '$shared/lib/pagination';
import { OffsetPagination } from '$shared/ui/pagination';

import { FEAT_ORGANIZATION_MY_LIST_I18N_NAMESPACE } from '../i18n';
import { createMyOrganizationListQueryOptions } from '../model/query';

export function MyOrganizationList() {
  const pagination = useOffsetQuery();
  const { t } = useT(FEAT_ORGANIZATION_MY_LIST_I18N_NAMESPACE);
  const { data: organizations } = useQuery(
    createMyOrganizationListQueryOptions(pagination),
  );

  const [limit, setLimit] = useState('10');

  return (
    <div className='flex flex-1 flex-col'>
      <div className='mb-6 grid grid-cols-3 gap-4'>
        {organizations?.data.map((organization) => (
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

      <SelectRoot value={limit} onValueChange={setLimit}>
        <SelectTrigger />

        <SelectContent placement='auto'>
          <SelectItem value='10'>10</SelectItem>
        </SelectContent>
      </SelectRoot>

      {organizations?.meta?.pagination && (
        <OffsetPagination
          page={organizations.meta.pagination.page}
          totalPages={organizations.meta.pagination.totalPages}
          hasNextPage={organizations.meta.pagination.hasNextPage}
        />
      )}
    </div>
  );
}
