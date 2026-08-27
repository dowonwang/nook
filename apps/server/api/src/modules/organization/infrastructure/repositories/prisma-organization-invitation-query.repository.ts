import { PrismaRepository } from '$shared/database';

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
  async findSentInvitations(params: {
    organizationId: OrganizationUuid;
    invitedByUserId: UserUuid;
  }): Promise<OrganizationInvitation[]> {
    const records = await this.client.organizationInvitation.findMany({
      where: {
        organizationId: params.organizationId.getValue(),
        invitedByUserId: params.invitedByUserId.getValue(),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return records.map((record) =>
      OrganizationInvitationPrismaMapper.toInvitationDomain(record),
    );
  }

  async findReceivedInvitations(params: {
    userId: UserUuid;
  }): Promise<OrganizationInvitation[]> {
    const records = await this.client.organizationInvitation.findMany({
      where: {
        inviteeUserId: params.userId.getValue(),
        status: 'PENDING',
      },
    });

    return records.map((record) =>
      OrganizationInvitationPrismaMapper.toInvitationDomain(record),
    );
  }
}
