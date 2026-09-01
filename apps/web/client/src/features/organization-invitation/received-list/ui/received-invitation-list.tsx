'use client';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '@packages/ui/components/table';
import { useQuery } from '@tanstack/react-query';

import { OrganizationInvitationReceivedRow } from '$entities/organization-invitation/ui/received-column';

import { receivedOrganizationInvitationListQueryOptions } from '../model/received-list-query';

export function ReceivedOrganizationInvitationList() {
  const { data: invitations } = useQuery(
    receivedOrganizationInvitationListQueryOptions,
  );

  if (!invitations || invitations.length === 0) {
    return <p className='text-sm'>받은 초대가 없습니다.</p>;
  }

  return (
    <Table className='mb-6'>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>organization</TableHeaderCell>
          <TableHeaderCell>inviter</TableHeaderCell>
          <TableHeaderCell>role</TableHeaderCell>
          <TableHeaderCell>status</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invitations.map((invitation) => (
          <OrganizationInvitationReceivedRow
            key={invitation.id}
            invitation={invitation}
          />
        ))}
      </TableBody>
    </Table>
  );
}
