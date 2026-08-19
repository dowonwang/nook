import { OrganizationMemberRoleBadge } from '$entities/organization-member/ui/role-badge';

import { OrganizationInvitationStatusBadge } from './status-badge';

import type { OrganizationInvitation } from '../model/organization-invitation';

interface Props {
  invitation: OrganizationInvitation;
}

export function OrganizationInvitationListItem({ invitation }: Props) {
  return (
    <tr>
      <td className='px-2 py-2 text-center'>
        {invitation.invitee?.name || '삭제된 사용자'}
      </td>
      <td className='px-2 py-2 text-center'>
        {invitation.invitee?.email || '사용자 정보를 찾을 수 없습니다.'}
      </td>
      <td className='px-2 py-2 text-center'>
        <OrganizationMemberRoleBadge role={invitation.role} />
      </td>
      <td className='px-2 py-2 text-center'>
        <OrganizationInvitationStatusBadge status={invitation.status} />
      </td>
    </tr>
  );
}
