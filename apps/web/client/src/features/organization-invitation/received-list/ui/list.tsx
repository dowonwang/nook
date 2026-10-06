'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '@packages/ui/components/table';
import { useQuery } from '@tanstack/react-query';
import { useT } from 'next-i18next/client';

import { OrganizationInvitationStatusBadge } from '$entities/organization-invitation';
import { OrganizationMemberRoleBadge } from '$entities/organization-member';
import {
  AcceptOrganizationInvitationButton,
  RejectOrganizationInvitationButton,
} from '$features/organization-invitation/change-status';

import { FEAT_ORGANIZATION_INVITATION_RECEIVED_LIST_I18N_NAMESPACE } from '../i18n';
import { receivedOrganizationInvitationListQueryOptions } from '../model/query';

export function ReceivedOrganizationInvitationList() {
  const { t } = useT(FEAT_ORGANIZATION_INVITATION_RECEIVED_LIST_I18N_NAMESPACE);

  const { data: invitations } = useQuery(
    receivedOrganizationInvitationListQueryOptions,
  );

  if (!invitations || invitations.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className='mb-4 text-lg font-semibold'>{t('title')}</h2>

      <Table className='mb-6'>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>{t('table.header.organization')}</TableHeaderCell>
            <TableHeaderCell>{t('table.header.inviter')}</TableHeaderCell>
            <TableHeaderCell>{t('table.header.role')}</TableHeaderCell>
            <TableHeaderCell>{t('table.header.status')}</TableHeaderCell>
            <TableHeaderCell className='w-0 whitespace-nowrap'>
              {t('table.header.actions')}
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invitations.map((invitation) => (
            <TableRow key={invitation.id}>
              <TableCell>{invitation.organization.title}</TableCell>
              <TableCell>
                {invitation.invitedBy?.email || t('table.body.email_fallback')}
              </TableCell>
              <TableCell>
                <OrganizationMemberRoleBadge role={invitation.role} />
              </TableCell>
              <TableCell>
                <OrganizationInvitationStatusBadge status={invitation.status} />
              </TableCell>
              <TableCell>
                <div className='flex items-center justify-center gap-2'>
                  <AcceptOrganizationInvitationButton
                    invitationId={invitation.id}
                  />
                  <RejectOrganizationInvitationButton
                    invitationId={invitation.id}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
