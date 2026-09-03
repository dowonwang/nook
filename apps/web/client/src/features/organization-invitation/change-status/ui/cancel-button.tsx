'use client';

import { Button } from '@packages/ui/components/button';
import { useQueryClient } from '@tanstack/react-query';
import { useTransition } from 'react';

import { ORGANIZATION_INVITATION_SENT_LIST_QUERY_KEY } from '$features/organization-invitation/sent-list/config/query-key';

import { changeOrganizationInvitationServerAction } from '../api/change-status-action.server';

interface Props {
  organizationId: string;
  invitationId: string;
}

export function CancelOrganizationInvitationButton({
  invitationId,
  organizationId,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const onClick = (invitationId: string) => {
    startTransition(async () => {
      await changeOrganizationInvitationServerAction({
        invitationId,
        status: 'CANCELED',
      });

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ORGANIZATION_INVITATION_SENT_LIST_QUERY_KEY(organizationId),
        }),
      ]);
    });
  };

  return (
    <Button
      size='small'
      className='bg-gray-100 text-gray-700 ring-gray-200 hover:bg-gray-200'
      disabled={isPending}
      onClick={() => {
        onClick(invitationId);
      }}
    >
      Cancel
    </Button>
  );
}
