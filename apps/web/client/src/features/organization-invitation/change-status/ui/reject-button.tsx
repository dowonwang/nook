'use client';

import { Button } from '@packages/ui/components/button';
import { useT } from 'next-i18next/client';
import { useTransition } from 'react';

import { changeOrganizationInvitationServerAction } from '../api/action.server';
import { FEAT_ORGANIZATION_CHANGE_STATUS_I18N_NAMESPACE } from '../i18n';

interface Props {
  invitationId: string;
}

export function RejectOrganizationInvitationButton({ invitationId }: Props) {
  const { t } = useT(FEAT_ORGANIZATION_CHANGE_STATUS_I18N_NAMESPACE);
  const [isPending, startTransition] = useTransition();

  const onClick = (invitationId: string) => {
    startTransition(async () => {
      await changeOrganizationInvitationServerAction({
        invitationId,
        status: 'REJECTED',
      });

      // await Promise.all([
      //   queryClient.invalidateQueries({
      //     queryKey: RECEIVED_ORGANIZATION_INVITATION_LIST_QUERY_KEY,
      //   }),
      // ]);
    });
  };

  return (
    <Button
      size='small'
      variant='secondary'
      disabled={isPending}
      onClick={() => {
        onClick(invitationId);
      }}
    >
      {t('button.reject')}
    </Button>
  );
}
