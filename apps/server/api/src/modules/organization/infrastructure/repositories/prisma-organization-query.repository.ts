import { OrganizationPrismaMapper } from '../mappers/organization-prisma.mapper';

import type { OrganizationReader } from '$modules/organization/application';
import type {
  Organization,
  OrganizationQueryRepository,
} from '$modules/organization/domain';
import type { UserUuid } from '$modules/user/domain';
import type { PrismaClient } from '@packages/api-db';

export class PrismaOrganizationQueryRepository
  implements OrganizationQueryRepository, OrganizationReader
{
  constructor(private readonly prisma: PrismaClient) {}

  async findOrganizationIdByUserIdAndTitle(
    userId: string,
    title: string,
  ): Promise<string | null> {
    const organization = await this.prisma.organization.findFirst({
      where: {
        title,
        organizationMembers: {
          some: {
            userId,
            role: 'ADMIN',
          },
        },
      },
      select: {
        id: true,
      },
    });

    return organization?.id ?? null;
  }

  async findUserOrganizations(params: {
    userId: UserUuid;
  }): Promise<Organization[]> {
    const records = await this.prisma.organization.findMany({
      where: {
        organizationMembers: {
          some: {
            userId: params.userId.getValue(),
          },
        },
      },
      include: {
        organizationMembers: true,
      },
    });

    return records.map((record) => {
      const members = record.organizationMembers;
      return OrganizationPrismaMapper.toOrganizationDomain(record, members);
    });
  }
}
