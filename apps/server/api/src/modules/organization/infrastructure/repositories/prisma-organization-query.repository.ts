import {
  offsetPaginationResultBuilder,
  type OffsetPagination,
  type OffsetPaginationResult,
} from '$shared/pagination';

import { OrganizationPrismaMapper } from '../mappers/organization-prisma.mapper';

import type { OrganizationReader } from '$modules/organization/application';
import type {
  Organization,
  OrganizationQueryRepository,
  OrganizationUuid,
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

  async findUserOrganizations(
    params: {
      userId: UserUuid;
    },
    pagination: OffsetPagination,
  ): Promise<{
    organizations: Organization[];
    paginationResult: OffsetPaginationResult;
  }> {
    const [records, count] = await this.prisma.$transaction([
      this.prisma.organization.findMany({
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
        skip: pagination.skip,
        take: pagination.limit,
      }),
      this.prisma.organization.count({
        where: {
          organizationMembers: {
            some: {
              userId: params.userId.getValue(),
            },
          },
        },
      }),
    ]);

    return {
      organizations: records.map((record) => {
        const members = record.organizationMembers;
        return OrganizationPrismaMapper.toOrganizationDomain(record, members);
      }),
      paginationResult: offsetPaginationResultBuilder(pagination, count),
    };
  }

  async findManyByIds(params: {
    organizationIds: OrganizationUuid[];
  }): Promise<Organization[]> {
    const records = await this.prisma.organization.findMany({
      where: {
        id: {
          in: params.organizationIds.map((id) => id.getValue()),
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
