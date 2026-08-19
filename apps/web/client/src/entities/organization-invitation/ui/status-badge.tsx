import type { OrganizationInvitationStatus } from '../model/organization-invitation';

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
    label: '수락됨',
  },
  PENDING: {
    style: 'bg-amber-100 text-amber-800 ring-amber-200',
    label: '대기 중',
  },
  CANCELED: {
    style: 'bg-gray-100 text-gray-700 ring-gray-200',
    label: '취소됨',
  },
  EXPIRED: {
    style: 'bg-slate-100 text-slate-600 ring-slate-200',
    label: '만료됨',
  },
  REJECTED: {
    style: 'bg-red-100 text-red-800 ring-red-200',
    label: '거절됨',
  },
};

export function OrganizationInvitationStatusBadge({ status }: Props) {
  const { label, style } = STATUS_CONFIG[status];

  return (
    <span
      className={`${style} rounded-full px-3 py-1 text-sm font-semibold ring-2`}
    >
      {label}
    </span>
  );
}
