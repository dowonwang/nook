import { PrismaRepository } from '$shared/database';
import {
  OffsetPaginationBuilder,
  type OffsetPagination,
  type OffsetPaginationResult,
} from '$shared/pagination';

import { OrganizationPrismaMapper } from '../mappers/organization';

import type { OrganizationReaderPort } from '$modules/organization/application';
import type {
  OrganizationAggregate,
  OrganizationSlugVo,
  OrganizationUuidVo,
} from '$modules/organization/domain';
import type { UserUuidVo } from '$modules/user/domain';

export class PrismaOrganizationQueryRepository
  extends PrismaRepository
  implements OrganizationReaderPort
{
  async findUserOrganizations(
    params: {
      userId: UserUuidVo;
    },
    pagination: OffsetPagination,
  ): Promise<{
    organizations: OrganizationAggregate[];
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
        orderBy: {
          id: 'desc',
        },
        ...OffsetPaginationBuilder.toOptions(pagination),
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
      paginationResult: OffsetPaginationBuilder.toResult(pagination, count),
    };
  }

  async findManyByIds(params: {
    organizationIds: OrganizationUuidVo[];
  }): Promise<OrganizationAggregate[]> {
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

  async findBySlug(
    slug: OrganizationSlugVo,
  ): Promise<OrganizationAggregate | null> {
    const record = await this.client.organization.findUnique({
      where: { slug: slug.getValue() },
      include: {
        organizationMembers: true,
      },
    });

    return record
      ? OrganizationPrismaMapper.toOrganizationDomain(
          record,
          record.organizationMembers,
        )
      : null;
  }
}
