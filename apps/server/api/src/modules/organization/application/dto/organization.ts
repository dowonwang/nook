import type { OrganizationMemberRoleValue } from '$modules/organization/domain';

export interface OrganizationDto {
  id: string;
  title: string;
}

export interface UserOrganizationDto extends OrganizationDto {
  userRole: OrganizationMemberRoleValue;
  memberCount: number;
}
