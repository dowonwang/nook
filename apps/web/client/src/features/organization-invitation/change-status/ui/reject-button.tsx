'use client';

import { Button } from '@packages/ui/components/button';
import { useQueryClient } from '@tanstack/react-query';
import { useTransition } from 'react';

import { RECEIVED_ORGANIZATION_INVITATION_LIST_QUERY_KEY } from '$features/organization-invitation/received-list/config/query-key';

import { changeOrganizationInvitationServerAction } from '../api/change-status-action.server';

interface Props {
  invitationId: string;
}

export function RejectOrganizationInvitationButton({ invitationId }: Props) {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const onClick = (invitationId: string) => {
    startTransition(async () => {
      await changeOrganizationInvitationServerAction({
        invitationId,
        status: 'REJECTED',
      });

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: RECEIVED_ORGANIZATION_INVITATION_LIST_QUERY_KEY,
        }),
      ]);
    });
  };

  return (
    <Button
      size='small'
      className='bg-red-500 ring-red-200 hover:bg-red-600'
      disabled={isPending}
      onClick={() => {
        onClick(invitationId);
      }}
    >
      Reject
    </Button>
  );
}
