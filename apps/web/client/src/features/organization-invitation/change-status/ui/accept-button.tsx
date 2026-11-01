'use client';

import { Button } from '@packages/ui/components/button';
import { useQueryClient } from '@tanstack/react-query';
import { useT } from 'next-i18next/client';
import { useTransition } from 'react';

import { MY_ORGANIZATION_LIST_BASE_QUERY_KEY } from '$entities/organization';
import { RECEIVED_ORGANIZATION_INVITATION_LIST_BASE_QUERY_KEY } from '$entities/organization-invitation';

import { changeOrganizationInvitationServerAction } from '../api/action.server';
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

      // 수락하면 받은 초대와 내 조직 목록이 모든 페이지에서 바뀌므로 접두사 키로 무효화
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: RECEIVED_ORGANIZATION_INVITATION_LIST_BASE_QUERY_KEY,
        }),
        queryClient.invalidateQueries({
          queryKey: MY_ORGANIZATION_LIST_BASE_QUERY_KEY,
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
