import type {
  OrganizationInvitation,
  OrganizationInvitationCommandRepository,
  OrganizationUuid,
} from '$modules/organization/domain';
import type { UserUuid } from '$modules/user/domain';
import type { PrismaClient } from '@packages/api-db';

export class PrismaOrganizationInvitationCommandRepository implements OrganizationInvitationCommandRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(invitation: OrganizationInvitation): Promise<void> {
    const { id, ...data } = invitation.toSnapshot();

    await this.prisma.organizationInvitation.upsert({
      where: { id },
      create: { id, ...data },
      update: { ...data },
    });
  }

  async existsPendingInvitation(input: {
    organizationId: OrganizationUuid;
    inviteeUserId: UserUuid;
  }): Promise<boolean> {
    const count = await this.prisma.organizationInvitation.count({
      where: {
        organizationId: input.organizationId.getValue(),
        inviteeUserId: input.inviteeUserId.getValue(),
        status: 'PENDING',
      },
    });

    return count > 0;
  }
}
