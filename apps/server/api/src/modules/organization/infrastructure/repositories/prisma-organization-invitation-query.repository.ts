import { OrganizationInvitationPrismaMapper } from '../mappers/organization-invitation-prisma.mapper';

import type { OrganizationInvitationReader } from '$modules/organization/application';
import type {
  OrganizationInvitation,
  OrganizationUuid,
} from '$modules/organization/domain';
import type { UserUuid } from '$modules/user/domain';
import type { PrismaClient } from '@packages/api-db';

export class PrismaOrganizationInvitationQueryRepository implements OrganizationInvitationReader {
  constructor(private readonly prisma: PrismaClient) {}
  async findSentInvitations(params: {
    organizationId: OrganizationUuid;
    invitedByUserId: UserUuid;
  }): Promise<OrganizationInvitation[]> {
    const records = await this.prisma.organizationInvitation.findMany({
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
}
