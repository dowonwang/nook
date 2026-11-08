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

import {
  sentOrganizationInvitationListQueryOptions,
  OrganizationInvitationStatusBadge,
} from '$entities/organization-invitation';
import { OrganizationMemberRoleBadge } from '$entities/organization-member';
import { CancelOrganizationInvitationButton } from '$features/organization-invitation/change-status';

import { WIDGETS_CREATE_ORGANIZATION_FLOW_I18N_NAMESPACE } from '../i18n';

interface Props {
  organizationId: string | undefined;
}

export function OrganizationInvitationSentList({ organizationId }: Props) {
  const { t } = useT(WIDGETS_CREATE_ORGANIZATION_FLOW_I18N_NAMESPACE);
  const { data: invitations } = useQuery(
    sentOrganizationInvitationListQueryOptions(organizationId),
  );

  if (!invitations || invitations.length === 0) {
    return <p className='text-center text-sm'>{t('sent_list.table.empty')}</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>{t('sent_list.table.header.name')}</TableHeaderCell>
          <TableHeaderCell>{t('sent_list.table.header.email')}</TableHeaderCell>
          <TableHeaderCell>{t('sent_list.table.header.role')}</TableHeaderCell>
          <TableHeaderCell>
            {t('sent_list.table.header.status')}
          </TableHeaderCell>
          <TableHeaderCell className='w-0 whitespace-nowrap'>
            {t('sent_list.table.header.actions')}
          </TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invitations.map((invitation) => (
          <TableRow key={invitation.id}>
            <TableCell>
              {invitation.invitee?.name ||
                t('sent_list.table.body.name_fallback')}
            </TableCell>
            <TableCell>
              {invitation.invitee?.email ||
                t('sent_list.table.body.invitee_email_fallback')}
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
