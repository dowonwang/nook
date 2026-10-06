import { useT } from 'next-i18next/client';

import { ENTITY_ORGANIZATION_INVITATION_I18N_NAMESPACE } from '../i18n';

import type { OrganizationInvitationStatus } from '../model/types';

interface Props {
  status: OrganizationInvitationStatus;
}

const STATUS_CONFIG: Record<
  OrganizationInvitationStatus,
  {
    style: string;
    label: string;
  }
> = {
  ACCEPTED: {
    style: 'bg-green-100 text-green-800 ring-green-200',
    label: 'status.accepted',
  },
  PENDING: {
    style: 'bg-amber-100 text-amber-800 ring-amber-200',
    label: 'status.pending',
  },
  CANCELED: {
    style: 'bg-gray-100 text-gray-700 ring-gray-200',
    label: 'status.canceled',
  },
  EXPIRED: {
    style: 'bg-slate-100 text-slate-600 ring-slate-200',
    label: 'status.expired',
  },
  REJECTED: {
    style: 'bg-red-100 text-red-800 ring-red-200',
    label: 'status.rejected',
  },
};

export function OrganizationInvitationStatusBadge({ status }: Props) {
  const { t } = useT(ENTITY_ORGANIZATION_INVITATION_I18N_NAMESPACE);
  const { label, style } = STATUS_CONFIG[status];

  return (
    <span
      className={`${style} rounded-full px-3 py-1 text-sm font-semibold ring-2`}
    >
      {t(label)}
    </span>
  );
}
