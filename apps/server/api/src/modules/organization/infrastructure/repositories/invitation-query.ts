import { PrismaRepository } from '$shared/database';
import {
  OffsetPaginationBuilder,
  type OffsetPagination,
  type OffsetPaginationResult,
} from '$shared/pagination';

import { OrganizationInvitationPrismaMapper } from '../mappers/invitation';

import type { OrganizationInvitationReaderPort } from '$modules/organization/application';
import type {
  OrganizationInvitationAggregate,
  OrganizationUuidVo,
} from '$modules/organization/domain';
import type { UserUuidVo } from '$modules/user/domain';

export class PrismaOrganizationInvitationQueryRepository
  extends PrismaRepository
  implements OrganizationInvitationReaderPort
{
  async findSentInvitations(
    params: {
      organizationId: OrganizationUuidVo;
      invitedByUserId: UserUuidVo;
    },
    pagination: OffsetPagination,
  ): Promise<{
    invitations: OrganizationInvitationAggregate[];
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
        ...OffsetPaginationBuilder.toOptions(pagination),
      }),
      this.client.organizationInvitation.count({
        where: condition,
      }),
    ]);

    return {
      invitations: records.map((record) =>
        OrganizationInvitationPrismaMapper.toInvitationDomain(record),
      ),
      paginationResult: OffsetPaginationBuilder.toResult(pagination, count),
    };
  }

  async findReceivedInvitations(
    params: {
      userId: UserUuidVo;
    },
    pagination: OffsetPagination,
  ): Promise<{
    invitations: OrganizationInvitationAggregate[];
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
        ...OffsetPaginationBuilder.toOptions(pagination),
      }),
      this.client.organizationInvitation.count({
        where: condition,
      }),
    ]);

    return {
      invitations: records.map((record) =>
        OrganizationInvitationPrismaMapper.toInvitationDomain(record),
      ),
      paginationResult: OffsetPaginationBuilder.toResult(pagination, count),
    };
  }
}
