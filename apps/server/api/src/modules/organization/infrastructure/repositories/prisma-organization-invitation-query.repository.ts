import { PrismaRepository } from '$shared/database';
import {
  offsetPaginationBuilder,
  type OffsetPagination,
  type OffsetPaginationResult,
} from '$shared/pagination';

import { OrganizationInvitationPrismaMapper } from '../mappers/organization-invitation-prisma.mapper';

import type { OrganizationInvitationReader } from '$modules/organization/application';
import type {
  OrganizationInvitation,
  OrganizationUuid,
} from '$modules/organization/domain';
import type { UserUuid } from '$modules/user/domain';

export class PrismaOrganizationInvitationQueryRepository
  extends PrismaRepository
  implements OrganizationInvitationReader
{
  async findSentInvitations(
    params: {
      organizationId: OrganizationUuid;
      invitedByUserId: UserUuid;
    },
    pagination: OffsetPagination,
  ): Promise<{
    invitations: OrganizationInvitation[];
    paginationResult: OffsetPaginationResult;
  }> {
    const condition = {
      organizationId: params.organizationId.getValue(),
      invitedByUserId: params.invitedByUserId.getValue(),
    };

    const [records, count] = await Promise.all([
      this.client.organizationInvitation.findMany({
        where: condition,
        orderBy: {
          createdAt: 'desc' as const,
        },
        ...offsetPaginationBuilder.toOptions(pagination),
      }),
      this.client.organizationInvitation.count({
        where: condition,
      }),
    ]);

    return {
      invitations: records.map((record) =>
        OrganizationInvitationPrismaMapper.toInvitationDomain(record),
      ),
      paginationResult: offsetPaginationBuilder.toResult(pagination, count),
    };
  }

  async findReceivedInvitations(
    params: {
      userId: UserUuid;
    },
    pagination: OffsetPagination,
  ): Promise<{
    invitations: OrganizationInvitation[];
    paginationResult: OffsetPaginationResult;
  }> {
    const condition = {
      inviteeUserId: params.userId.getValue(),
      status: 'PENDING' as const,
      expiresAt: {
        gt: new Date(),
      },
    };

    const [records, count] = await Promise.all([
      this.client.organizationInvitation.findMany({
        where: condition,
        orderBy: {
          createdAt: 'desc',
        },
        ...offsetPaginationBuilder.toOptions(pagination),
      }),
      this.client.organizationInvitation.count({
        where: condition,
      }),
    ]);

    return {
      invitations: records.map((record) =>
        OrganizationInvitationPrismaMapper.toInvitationDomain(record),
      ),
      paginationResult: offsetPaginationBuilder.toResult(pagination, count),
    };
  }
}
