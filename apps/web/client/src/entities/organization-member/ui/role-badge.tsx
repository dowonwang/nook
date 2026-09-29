import { useT } from 'next-i18next/client';

import { ENTITY_ORGANIZATION_MEMBER_I18N_NAMESPACE } from '../i18n';

import type { OrganizationMemberRole } from '../model/organization-member';

interface Props {
  role: OrganizationMemberRole;
}

const STATUS_CONFIG: Record<
  OrganizationMemberRole,
  {
    style: string;
    label: string;
  }
> = {
  ADMIN: {
    style: 'bg-purple-100 text-purple-800 ring-purple-300',
    label: 'role.admin',
  },
  MAINTAINER: {
    style: 'bg-indigo-100 text-indigo-800 ring-indigo-300',
    label: 'role.maintainer',
  },
  MEMBER: {
    style: 'bg-slate-100 text-slate-700 ring-slate-200',
    label: 'role.member',
  },
};

export function OrganizationMemberRoleBadge({ role }: Props) {
  const { t } = useT(ENTITY_ORGANIZATION_MEMBER_I18N_NAMESPACE);
  const { label, style } = STATUS_CONFIG[role];

  return (
    <span
      className={`${style} rounded-full px-3 py-1 text-sm font-semibold ring-2`}
    >
      {t(label)}
    </span>
  );
}
