import { OrganizationMember } from '$modules/organization/domain/entities/organization-member.entity';
import { Organization } from '$modules/organization/domain/entities/organization.entity';
import { OrganizationMemberUuid } from '$modules/organization/domain/value-objects/organization-member-uuid.vo';
import { OrganizationUuid } from '$modules/organization/domain/value-objects/organization-uuid.vo';
import { UserUuid } from '$modules/user/domain/value-objects/uuid.vo';

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
      role: record.role,
    });
  },
} as const;
