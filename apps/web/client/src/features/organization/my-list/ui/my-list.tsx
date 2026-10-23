'use client';

import { Button } from '@packages/ui/components/button';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@packages/ui/components/card';
import { useQuery } from '@tanstack/react-query';
import { Users2 } from 'lucide-react';
import { useT } from 'next-i18next/client';

import { OrganizationMemberRoleBadge } from '$entities/organization-member';
import { useOffsetQuery } from '$shared/lib/pagination';
import {
  OffsetPagination,
  PaginationLimitSelector,
} from '$shared/ui/pagination';

import { FEAT_ORGANIZATION_MY_LIST_I18N_NAMESPACE } from '../i18n';
import { createMyOrganizationListQueryOptions } from '../model/query';

const tw = String.raw;
const CARD_DL_STYLE = tw`[&>dt]:text-secondary-foreground space-y-4 [&>dt]:text-sm [&>dt]:font-semibold`;

export function MyOrganizationList() {
  const pagination = useOffsetQuery();
  const { t } = useT(FEAT_ORGANIZATION_MY_LIST_I18N_NAMESPACE);
  const { data: organizations } = useQuery(
    createMyOrganizationListQueryOptions(pagination),
  );

  return (
    <>
      <PaginationLimitSelector />

      <div className='flex-1'>
        <section className='mb-page grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          <h2 className='sr-only'>{t('title')}</h2>

          {organizations?.data.map((organization) => (
            <Card key={organization.id} isArticle>
              <CardHeader className='flex items-center justify-between'>
                <CardTitle level='h3'>{organization.title}</CardTitle>
              </CardHeader>

              <CardBody>
                <dl className='grid grid-cols-2'>
                  <div className={CARD_DL_STYLE}>
                    <dt>내 역할</dt>
                    <dd>
                      <OrganizationMemberRoleBadge
                        role={organization.userRole}
                      />
                    </dd>
                  </div>

                  <div className={CARD_DL_STYLE}>
                    <dt>{t('card.member_count')}</dt>
                    <dd className='flex items-center gap-2'>
                      <Users2 className='w-5' />
                      {organization.memberCount}
                    </dd>
                  </div>
                </dl>
              </CardBody>

              <CardFooter>
                <Button
                  size='small'
                  variant='secondary'
                  className='block w-full'
                >
                  {t('button.detail')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </section>
      </div>

      {organizations?.meta?.pagination && (
        <OffsetPagination
          page={organizations.meta.pagination.page}
          totalPages={organizations.meta.pagination.totalPages}
          hasNextPage={organizations.meta.pagination.hasNextPage}
        />
      )}
    </>
  );
}
