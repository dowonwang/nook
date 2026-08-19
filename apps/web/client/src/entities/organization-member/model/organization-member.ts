// eslint-disable-next-line @typescript-eslint/no-unused-vars
const role = ['ADMIN', 'MAINTAINER', 'MEMBER'] as const;

export type OrganizationMemberRole = (typeof role)[number];
