import { RadioButton } from '@packages/ui/components/radio';

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
  { id: 'ADMIN', label: 'Admin' },
  { id: 'MAINTAINER', label: 'Maintainer' },
  { id: 'MEMBER', label: 'Member' },
];

export function OrganizationMemberRoleRadioGroup({
  name = 'role',
  defaultChecked,
}: Props) {
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
          {item.label}
        </RadioButton>
      ))}
    </div>
  );
}
