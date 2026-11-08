'use client';

import { Button } from '@packages/ui/components/button';
import { useT } from 'next-i18next/client';
import { useTransition } from 'react';

import { changeOrganizationInvitationStatusServerAction } from '../api/action.server';
import { FEATURES_ORGANIZATION_INVITATION_CHANGE_STATUS_I18N_NAMESPACE } from '../i18n';

interface Props {
  invitationId: string;
}

export function RejectOrganizationInvitationButton({ invitationId }: Props) {
  const { t } = useT(
    FEATURES_ORGANIZATION_INVITATION_CHANGE_STATUS_I18N_NAMESPACE,
  );
  const [isPending, startTransition] = useTransition();

  const onClick = (invitationId: string) => {
    startTransition(async () => {
      await changeOrganizationInvitationStatusServerAction({
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
