'use client';

import { Button } from '@packages/ui/components/button';
import { useQueryClient } from '@tanstack/react-query';
import { useT } from 'next-i18next/client';
import { useTransition } from 'react';

import { MY_ORGANIZATION_LIST_QUERY_KEY } from '$features/organization/my-list/config/query-key';
import { RECEIVED_ORGANIZATION_INVITATION_LIST_QUERY_KEY } from '$features/organization-invitation/received-list/config/query-key';

import { changeOrganizationInvitationServerAction } from '../api/change-status-action.server';
import { FEAT_ORGANIZATION_CHANGE_STATUS_I18N_NAMESPACE } from '../i18n';

interface Props {
  invitationId: string;
}

export function AcceptOrganizationInvitationButton({ invitationId }: Props) {
  const { t } = useT(FEAT_ORGANIZATION_CHANGE_STATUS_I18N_NAMESPACE);

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
      {t('button.accept')}
    </Button>
  );
}
