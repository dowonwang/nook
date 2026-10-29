import {
  OrganizationAggregate,
  OrganizationMemberEntity,
  OrganizationMemberRoleVo,
  OrganizationMemberUuidVo,
  OrganizationSlugVo,
  OrganizationUuidVo,
} from '$modules/organization/domain';
import { UserUuidVo } from '$modules/user/domain';

import type {
  Organization as PrismaOrganization,
  OrganizationMember as PrismaOrganizationMember,
} from '@packages/api-db';

export const OrganizationPrismaMapper = {
  toOrganizationDomain(
    organizationRecord: PrismaOrganization,
    membersRecord: PrismaOrganizationMember[],
  ): OrganizationAggregate {
    const members = membersRecord.map((member) =>
      OrganizationPrismaMapper.toMemberDomain(member),
    );

    return OrganizationAggregate.reconstruct(
      OrganizationUuidVo.create(organizationRecord.id),
      {
        title: organizationRecord.title,
        slug: OrganizationSlugVo.create(organizationRecord.slug),
      },
      members,
    );
  },

  toMemberDomain(record: PrismaOrganizationMember): OrganizationMemberEntity {
    return OrganizationMemberEntity.create(
      OrganizationMemberUuidVo.create(record.id),
      {
        userId: UserUuidVo.create(record.userId),
        organizationId: OrganizationUuidVo.create(record.organizationId),
        role: OrganizationMemberRoleVo.create(record.role),
      },
    );
  },
} as const;
