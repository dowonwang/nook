import type { OrganizationMemberRoleValue } from '$modules/organization/domain';

interface Organization {
  id: string;
  title: string;
}

export interface UserOrganizationDto extends Organization {
  userRole: OrganizationMemberRoleValue;
  memberCount: number;
}
