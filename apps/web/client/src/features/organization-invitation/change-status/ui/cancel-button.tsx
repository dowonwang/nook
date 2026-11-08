'use client';

import { Button } from '@packages/ui/components/button';
import { useQueryClient } from '@tanstack/react-query';
import { useT } from 'next-i18next/client';
import { useTransition } from 'react';

import { SENT_ORGANIZATION_INVITATION_LIST_QUERY_KEY } from '$entities/organization-invitation';

import { changeOrganizationInvitationStatusServerAction } from '../api/action.server';
import { FEATURES_ORGANIZATION_INVITATION_CHANGE_STATUS_I18N_NAMESPACE } from '../i18n';

interface Props {
  organizationId: string;
  invitationId: string;
}

export function CancelOrganizationInvitationButton({
  invitationId,
  organizationId,
}: Props) {
  const { t } = useT(
    FEATURES_ORGANIZATION_INVITATION_CHANGE_STATUS_I18N_NAMESPACE,
  );

  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const onClick = (invitationId: string) => {
    startTransition(async () => {
      await changeOrganizationInvitationStatusServerAction({
        invitationId,
        status: 'CANCELED',
      });

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: SENT_ORGANIZATION_INVITATION_LIST_QUERY_KEY(organizationId),
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
      {t('button.cancel')}
    </Button>
  );
}
