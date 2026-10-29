export const ORGANIZATION_MEMBER_ROLE = [
  'ADMIN',
  'MAINTAINER',
  'MEMBER',
] as const;

export type OrganizationMemberRole = (typeof ORGANIZATION_MEMBER_ROLE)[number];
