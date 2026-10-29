import type { OrganizationMemberRole } from '$entities/organization-member/@x/organization';

export interface Organization {
  id: string;
  title: string;
  slug: string;
}

export interface UserOrganization extends Organization {
  userRole: OrganizationMemberRole;
  memberCount: number;
}
