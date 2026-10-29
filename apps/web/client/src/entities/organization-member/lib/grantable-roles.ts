import { ORGANIZATION_MEMBER_ROLE } from '../model/types';

import type { OrganizationMemberRole } from '../model/types';

// 숫자가 클수록 높은 권한 (서버 OrganizationMemberRoleVo와 같은 기준)
const ROLE_RANK: Record<OrganizationMemberRole, number> = {
  ADMIN: 3,
  MAINTAINER: 2,
  MEMBER: 1,
};

// 자신보다 높은 역할은 부여할 수 없음
export function getGrantableOrganizationMemberRoles(
  granterRole: OrganizationMemberRole,
): OrganizationMemberRole[] {
  return ORGANIZATION_MEMBER_ROLE.filter(
    (role) => ROLE_RANK[role] <= ROLE_RANK[granterRole],
  );
}
