import { PrismaRepository } from '$shared/database';

import { OrganizationInvitationPrismaMapper } from '../mappers/invitation';

import type {
  OrganizationInvitationAggregate,
  OrganizationInvitationCommandRepository,
  OrganizationInvitationUuidVo,
  OrganizationUuidVo,
} from '$modules/organization/domain';
import type { UserUuidVo } from '$modules/user/domain';

export class PrismaOrganizationInvitationCommandRepository
  extends PrismaRepository
  implements OrganizationInvitationCommandRepository
{
  async save(invitation: OrganizationInvitationAggregate): Promise<void> {
    const { id, ...data } = invitation.toSnapshot();

    await this.client.organizationInvitation.upsert({
      where: { id },
      create: { id, ...data },
      update: { ...data },
    });
  }

  async existsActiveInvitation(input: {
    organizationId: OrganizationUuidVo;
    inviteeUserId: UserUuidVo;
  }): Promise<boolean> {
    const count = await this.client.organizationInvitation.count({
      where: {
        organizationId: input.organizationId.getValue(),
        inviteeUserId: input.inviteeUserId.getValue(),
        status: 'PENDING',
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    return count > 0;
  }

  async findById(
    id: OrganizationInvitationUuidVo,
  ): Promise<OrganizationInvitationAggregate | null> {
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
