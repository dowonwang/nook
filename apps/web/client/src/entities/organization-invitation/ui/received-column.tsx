import { TableCell, TableRow } from '@packages/ui/components/table';

import { OrganizationMemberRoleBadge } from '$entities/organization-member/ui/role-badge';

import { OrganizationInvitationStatusBadge } from './status-badge';

import type { OrganizationReceivedInvitation } from '../model/organization-invitation';

interface Props {
  invitation: OrganizationReceivedInvitation;
}

export function OrganizationInvitationReceivedRow({ invitation }: Props) {
  return (
    <TableRow>
      <TableCell>{invitation.organization.title}</TableCell>
      <TableCell>
        {invitation.invitedBy?.email || '사용자 정보를 찾을 수 없습니다.'}
      </TableCell>
      <TableCell>
        <OrganizationMemberRoleBadge role={invitation.role} />
      </TableCell>
      <TableCell>
        <OrganizationInvitationStatusBadge status={invitation.status} />
      </TableCell>
    </TableRow>
  );
}
