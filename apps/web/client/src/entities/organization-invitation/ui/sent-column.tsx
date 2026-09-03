import { TableCell, TableRow } from '@packages/ui/components/table';

import { OrganizationMemberRoleBadge } from '$entities/organization-member/ui/role-badge';

import { OrganizationInvitationStatusBadge } from './status-badge';

import type { OrganizationSentInvitation } from '../model/organization-invitation';

interface Props {
  invitation: OrganizationSentInvitation;
  actions?: React.ReactNode;
}

export function OrganizationInvitationSentRow({ invitation, actions }: Props) {
  return (
    <TableRow>
      <TableCell>{invitation.invitee?.name || '삭제된 사용자'}</TableCell>
      <TableCell>
        {invitation.invitee?.email || '사용자 정보를 찾을 수 없습니다.'}
      </TableCell>
      <TableCell>
        <OrganizationMemberRoleBadge role={invitation.role} />
      </TableCell>
      <TableCell>
        <OrganizationInvitationStatusBadge status={invitation.status} />
      </TableCell>
      {actions && <TableCell>{actions}</TableCell>}
    </TableRow>
  );
}
