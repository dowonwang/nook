import { RadioButton } from '@packages/ui/components/radio';
import { useT } from 'next-i18next/client';

import { ENTITY_ORGANIZATION_MEMBER_I18N_NAMESPACE } from '../i18n';

import type { OrganizationMemberRole } from '../model/organization-member';

interface Props {
  name?: string;
  defaultChecked?: OrganizationMemberRole;
}

interface RadioItem {
  id: OrganizationMemberRole;
  label: string;
}

const RADIO_ITEMS: RadioItem[] = [
  { id: 'ADMIN', label: 'role.admin' },
  { id: 'MAINTAINER', label: 'role.maintainer' },
  { id: 'MEMBER', label: 'role.member' },
];

export function OrganizationMemberRoleRadioGroup({
  name = 'role',
  defaultChecked,
}: Props) {
  const { t } = useT(ENTITY_ORGANIZATION_MEMBER_I18N_NAMESPACE);
  const isDefaultChecked = (value: OrganizationMemberRole): boolean => {
    return value === defaultChecked;
  };

  return (
    <div className='flex flex-wrap items-center gap-2'>
      {RADIO_ITEMS.map((item) => (
        <RadioButton
          key={item.id}
          id={item.id}
          name={name}
          value={item.id}
          defaultChecked={isDefaultChecked(item.id)}
        >
          {t(item.label)}
        </RadioButton>
      ))}
    </div>
  );
}
