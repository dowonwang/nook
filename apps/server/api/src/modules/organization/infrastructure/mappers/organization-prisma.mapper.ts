import {
  Organization,
  OrganizationMember,
  OrganizationMemberRole,
  OrganizationMemberUuid,
  OrganizationUuid,
} from '$modules/organization/domain';
import { UserUuid } from '$modules/user/domain';

import type {
  Organization as PrismaOrganization,
  OrganizationMember as PrismaOrganizationMember,
} from '@packages/api-db';

export const OrganizationPrismaMapper = {
  toOrganizationDomain(
    organizationRecord: PrismaOrganization,
    membersRecord: PrismaOrganizationMember[],
  ): Organization {
    const members = membersRecord.map((member) =>
      OrganizationPrismaMapper.toMemberDomain(member),
    );

    return Organization.reconstruct(
      OrganizationUuid.create(organizationRecord.id),
      {
        title: organizationRecord.title,
      },
      members,
    );
  },

  toMemberDomain(record: PrismaOrganizationMember): OrganizationMember {
    return OrganizationMember.create(OrganizationMemberUuid.create(record.id), {
      userId: UserUuid.create(record.userId),
      organizationId: OrganizationUuid.create(record.organizationId),
      role: OrganizationMemberRole.create(record.role),
    });
  },
} as const;
