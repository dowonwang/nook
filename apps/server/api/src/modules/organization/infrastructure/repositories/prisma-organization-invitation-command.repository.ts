import { PrismaRepository } from '$shared/database';

import { OrganizationInvitationPrismaMapper } from '../mappers/organization-invitation-prisma.mapper';

import type {
  OrganizationInvitation,
  OrganizationInvitationCommandRepository,
  OrganizationInvitationUuid,
  OrganizationUuid,
} from '$modules/organization/domain';
import type { UserUuid } from '$modules/user/domain';

export class PrismaOrganizationInvitationCommandRepository
  extends PrismaRepository
  implements OrganizationInvitationCommandRepository
{
  async save(invitation: OrganizationInvitation): Promise<void> {
    const { id, ...data } = invitation.toSnapshot();

    await this.client.organizationInvitation.upsert({
      where: { id },
      create: { id, ...data },
      update: { ...data },
    });
  }

  async existsPendingInvitation(input: {
    organizationId: OrganizationUuid;
    inviteeUserId: UserUuid;
  }): Promise<boolean> {
    const count = await this.client.organizationInvitation.count({
      where: {
        organizationId: input.organizationId.getValue(),
        inviteeUserId: input.inviteeUserId.getValue(),
        status: 'PENDING',
      },
    });

    return count > 0;
  }

  async findById(
    id: OrganizationInvitationUuid,
  ): Promise<OrganizationInvitation | null> {
    const record = await this.client.organizationInvitation.findUnique({
      where: {
        id: id.getValue(),
      },
    });

    return record
      ? OrganizationInvitationPrismaMapper.toInvitationDomain(record)
      : null;
  }
}
