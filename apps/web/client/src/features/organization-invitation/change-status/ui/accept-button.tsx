'use client';

import { Button } from '@packages/ui/components/button';
import { useQueryClient } from '@tanstack/react-query';
import { useTransition } from 'react';

import { MY_ORGANIZATION_LIST_QUERY_KEY } from '$features/organization/my-list/config/query-key';
import { RECEIVED_ORGANIZATION_INVITATION_LIST_QUERY_KEY } from '$features/organization-invitation/received-list/config/query-key';

import { changeOrganizationInvitationServerAction } from '../api/change-status-action.server';

interface Props {
  invitationId: string;
}

export function AcceptOrganizationInvitationButton({ invitationId }: Props) {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const onClick = (invitationId: string) => {
    startTransition(async () => {
      await changeOrganizationInvitationServerAction({
        invitationId,
        status: 'ACCEPTED',
      });

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: RECEIVED_ORGANIZATION_INVITATION_LIST_QUERY_KEY,
        }),
        queryClient.invalidateQueries({
          queryKey: MY_ORGANIZATION_LIST_QUERY_KEY,
        }),
      ]);
    });
  };

  return (
    <Button
      size='small'
      disabled={isPending}
      onClick={() => {
        onClick(invitationId);
      }}
    >
      Accept
    </Button>
  );
}
