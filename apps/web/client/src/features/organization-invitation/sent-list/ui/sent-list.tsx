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
import { CancelOrganizationInvitationButton } from '$features/organization-invitation/change-status';

import { FEAT_ORGANIZATION_INVITATION_SENT_LIST_I18N_NAMESPACE } from '../i18n';
import { organizationInvitationSentListQueryOptions } from '../model/sent-list-query';

interface Props {
  organizationId: string | undefined;
}

export function OrganizationInvitationSentList({ organizationId }: Props) {
  const { t } = useT(FEAT_ORGANIZATION_INVITATION_SENT_LIST_I18N_NAMESPACE);
  const { data: invitations } = useQuery(
    organizationInvitationSentListQueryOptions(organizationId),
  );

  if (!invitations || invitations.length === 0) {
    return <p className='text-center text-sm'>{t('table.empty')}</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>{t('table.header.name')}</TableHeaderCell>
          <TableHeaderCell>{t('table.header.email')}</TableHeaderCell>
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
            <TableCell>
              {invitation.invitee?.name || t('table.body.name_fallback')}
            </TableCell>
            <TableCell>
              {invitation.invitee?.email ||
                t('table.body.invitee_email_fallback')}
            </TableCell>
            <TableCell>
              <OrganizationMemberRoleBadge role={invitation.role} />
            </TableCell>
            <TableCell>
              <OrganizationInvitationStatusBadge status={invitation.status} />
            </TableCell>
            <TableCell>
              <CancelOrganizationInvitationButton
                organizationId={organizationId || ''}
                invitationId={invitation.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
