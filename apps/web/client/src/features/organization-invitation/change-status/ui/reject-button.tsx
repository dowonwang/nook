'use client';

import { Button } from '@packages/ui/components/button';
import { useQueryClient } from '@tanstack/react-query';
import { useT } from 'next-i18next/client';
import { useTransition } from 'react';

import { RECEIVED_ORGANIZATION_INVITATION_LIST_BASE_QUERY_KEY } from '$entities/organization-invitation';

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
  const queryClient = useQueryClient();

  const onClick = (invitationId: string) => {
    startTransition(async () => {
      await changeOrganizationInvitationStatusServerAction({
        invitationId,
        status: 'REJECTED',
      });

      // 거절하면 받은 초대 목록이 모든 페이지에서 바뀌므로 접두사 키로 무효화
      await queryClient.invalidateQueries({
        queryKey: RECEIVED_ORGANIZATION_INVITATION_LIST_BASE_QUERY_KEY,
      });
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
