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
import Link from 'next/link';
import { useT } from 'next-i18next/client';

import { myOrganizationListQueryOptions } from '$entities/organization';
import { OrganizationMemberRoleBadge } from '$entities/organization-member';
import { useOffsetQuery } from '$shared/lib/pagination';
import {
  OffsetPagination,
  PaginationLimitSelector,
} from '$shared/ui/pagination';

import { PAGES_ORGANIZATION_HOME_I18N_NAMESPACE } from '../i18n';

const tw = String.raw;
const CARD_DL_STYLE = tw`[&>dt]:text-secondary-foreground space-y-4 [&>dt]:text-sm [&>dt]:font-semibold`;

export function MyOrganizationList() {
  const pagination = useOffsetQuery();
  const { t } = useT(PAGES_ORGANIZATION_HOME_I18N_NAMESPACE);
  const { data: organizations } = useQuery(
    myOrganizationListQueryOptions(pagination),
  );

  return (
    <>
      <PaginationLimitSelector
        total={organizations?.meta?.pagination.total || 0}
      />

      <div className='flex-1'>
        <section className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          <h2 className='sr-only'>{t('list.title')}</h2>

          {organizations?.data.map((organization) => (
            <Card key={organization.id} isArticle>
              <CardHeader className='flex items-center justify-between'>
                <CardTitle level='h3'>{organization.title}</CardTitle>
              </CardHeader>

              <CardBody>
                <dl className='grid grid-cols-2'>
                  <div className={CARD_DL_STYLE}>
                    <dt>{t('list.card.role')}</dt>
                    <dd>
                      <OrganizationMemberRoleBadge
                        role={organization.userRole}
                      />
                    </dd>
                  </div>

                  <div className={CARD_DL_STYLE}>
                    <dt>{t('list.card.member_count')}</dt>
                    <dd className='flex items-center gap-2'>
                      <Users2 className='w-5' />
                      {organization.memberCount}
                    </dd>
                  </div>
                </dl>
              </CardBody>

              <CardFooter>
                <Button
                  asChild
                  size='small'
                  variant='secondary'
                  className='w-full'
                >
                  <Link href={`/org/detail/${organization.slug}`}>
                    {t('list.button.detail')}
                  </Link>
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
