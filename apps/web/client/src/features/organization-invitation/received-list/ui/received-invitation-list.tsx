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
import { RejectOrganizationInvitationButton } from '$features/organization-invitation/change-status';
import { AcceptOrganizationInvitationButton } from '$features/organization-invitation/change-status/ui/accept-button';

import { receivedOrganizationInvitationListQueryOptions } from '../model/received-list-query';

export function ReceivedOrganizationInvitationList() {
  const { data: invitations } = useQuery(
    receivedOrganizationInvitationListQueryOptions,
  );

  if (!invitations || invitations.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className='mb-4 text-lg font-semibold'>받은 초대</h2>

      <Table className='mb-6'>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>organization</TableHeaderCell>
            <TableHeaderCell>inviter</TableHeaderCell>
            <TableHeaderCell>role</TableHeaderCell>
            <TableHeaderCell>status</TableHeaderCell>
            <TableHeaderCell className='w-0 whitespace-nowrap'>
              actions
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invitations.map((invitation) => (
            <OrganizationInvitationReceivedRow
              key={invitation.id}
              invitation={invitation}
              actions={
                <div className='flex items-center justify-center gap-2'>
                  <AcceptOrganizationInvitationButton
                    invitationId={invitation.id}
                  />
                  <RejectOrganizationInvitationButton
                    invitationId={invitation.id}
                  />
                </div>
              }
            />
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
