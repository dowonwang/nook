'use client';

import { useQuery } from '@tanstack/react-query';

import { OrganizationInvitationListItem } from '$entities/organization-invitation';

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
    <table className='border-border w-full table-auto border-collapse border'>
      <thead className='bg-secondary'>
        <tr>
          <th className='border-border border py-2'>name</th>
          <th className='border-border border py-2'>email</th>
          <th className='border-border border py-2'>role</th>
          <th className='border-border border py-2'>status</th>
        </tr>
      </thead>
      <tbody>
        {invitations.map((invitation) => (
          <OrganizationInvitationListItem
            key={invitation.id}
            invitation={invitation}
          />
        ))}
      </tbody>
    </table>
  );
}
