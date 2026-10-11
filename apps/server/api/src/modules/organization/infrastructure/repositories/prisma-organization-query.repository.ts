import { PrismaRepository } from '$shared/database';
import {
  offsetPaginationBuilder,
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

export class PrismaOrganizationQueryRepository
  extends PrismaRepository
  implements OrganizationQueryRepository, OrganizationReader
{
  async findOrganizationIdByUserIdAndTitle(
    userId: string,
    title: string,
  ): Promise<string | null> {
    const organization = await this.client.organization.findFirst({
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
    const condition = {
      organizationMembers: {
        some: {
          userId: params.userId.getValue(),
        },
      },
    };

    const [records, count] = await Promise.all([
      this.client.organization.findMany({
        where: condition,
        include: {
          organizationMembers: true,
        },
        ...offsetPaginationBuilder.toOptions(pagination),
      }),
      this.client.organization.count({
        where: condition,
      }),
    ]);

    return {
      organizations: records.map((record) => {
        const members = record.organizationMembers;
        return OrganizationPrismaMapper.toOrganizationDomain(record, members);
      }),
      paginationResult: offsetPaginationBuilder.toResult(pagination, count),
    };
  }

  async findManyByIds(params: {
    organizationIds: OrganizationUuid[];
  }): Promise<Organization[]> {
    const records = await this.client.organization.findMany({
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
