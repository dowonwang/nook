'use client';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '@packages/ui/components/table';
import { useQuery } from '@tanstack/react-query';

import { OrganizationInvitationSentRow } from '$entities/organization-invitation';
import { CancelOrganizationInvitationButton } from '$features/organization-invitation/change-status';

import { organizationInvitationSentListQueryOptions } from '../model/sent-list-query';

interface Props {
  organizationId: string | undefined;
}

export function OrganizationInvitationSentList({ organizationId }: Props) {
  const { data: invitations } = useQuery(
    organizationInvitationSentListQueryOptions(organizationId),
  );

  if (!invitations || invitations.length === 0) {
    return <p className='text-sm'>보낸 초대가 없습니다.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>name</TableHeaderCell>
          <TableHeaderCell>email</TableHeaderCell>
          <TableHeaderCell>role</TableHeaderCell>
          <TableHeaderCell>status</TableHeaderCell>
          <TableHeaderCell className='w-0 whitespace-nowrap'>
            action
          </TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invitations.map((invitation) => (
          <OrganizationInvitationSentRow
            key={invitation.id}
            invitation={invitation}
            actions={
              <CancelOrganizationInvitationButton
                organizationId={organizationId || ''}
                invitationId={invitation.id}
              />
            }
          />
        ))}
      </TableBody>
    </Table>
  );
}
