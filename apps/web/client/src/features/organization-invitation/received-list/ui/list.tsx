'use client';

import { Card, CardBody, CardFooter } from '@packages/ui/components/card';
import { useQuery } from '@tanstack/react-query';
import { useT } from 'next-i18next/client';

import { OrganizationInvitationStatusBadge } from '$entities/organization-invitation';
import { OrganizationMemberRoleBadge } from '$entities/organization-member';
import {
  AcceptOrganizationInvitationButton,
  RejectOrganizationInvitationButton,
} from '$features/organization-invitation/change-status';
import { useOffsetQuery } from '$shared/lib/pagination';
import {
  OffsetPagination,
  PaginationLimitSelector,
} from '$shared/ui/pagination';

import { FEAT_ORGANIZATION_INVITATION_RECEIVED_LIST_I18N_NAMESPACE } from '../i18n';
import { receivedOrganizationInvitationListQueryOptions } from '../model/query';

export function ReceivedOrganizationInvitationList() {
  const pagination = useOffsetQuery();
  const { t } = useT(FEAT_ORGANIZATION_INVITATION_RECEIVED_LIST_I18N_NAMESPACE);

  const { data: invitations } = useQuery(
    receivedOrganizationInvitationListQueryOptions(pagination),
  );

  // TODO: 빈값 ui 추가
  if (!invitations?.data || invitations.data.length === 0) {
    return null;
  }

  return (
    <>
      {(invitations.meta?.pagination.total || 0) > 10 && (
        <PaginationLimitSelector />
      )}

      <section className='mb-page grid flex-1 grid-cols-1 gap-4 md:grid-cols-2'>
        {invitations.data.map((invitation) => (
          <Card key={invitation.id} isArticle className='h-fit'>
            <CardBody className='space-y-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <h2 className='text-xl font-semibold'>
                    {invitation.organization.title}
                  </h2>
                  <p className='text-secondary-foreground font-light'>
                    {invitation.invitedBy?.email ||
                      t('card.body.email_fallback')}
                  </p>
                </div>
                <OrganizationInvitationStatusBadge status={invitation.status} />
              </div>

              <div className='flex items-center justify-between'>
                <p className='text-secondary-foreground text-sm font-light'>
                  {t('card.body.role')}
                </p>
                <OrganizationMemberRoleBadge role={invitation.role} />
              </div>
            </CardBody>

            <CardFooter className='flex gap-2 [&>button]:w-full'>
              <AcceptOrganizationInvitationButton
                invitationId={invitation.id}
              />
              <RejectOrganizationInvitationButton
                invitationId={invitation.id}
              />
            </CardFooter>
          </Card>
        ))}
      </section>

      {invitations.meta?.pagination && (
        <OffsetPagination
          page={invitations.meta.pagination.page}
          totalPages={invitations.meta.pagination.totalPages}
          hasNextPage={invitations.meta.pagination.hasNextPage}
        />
      )}
    </>
  );
}
