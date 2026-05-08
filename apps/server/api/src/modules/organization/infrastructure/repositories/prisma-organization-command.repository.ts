import { OrganizationCreatededEvent } from '$modules/organization/domain/events/organization-createded.event';
import { OrganizationMembersAddedEvent } from '$modules/organization/domain/events/organization-members-added.event';
import { OrganizationPrismaMapper } from '$modules/organization/infrastructure/mappers/organization-prisma.mapper';
import { logger } from '$shared/logger/logger';

import type { Organization } from '$modules/organization/domain/entities/organization.entity';
import type { OrganizationCommandRepository } from '$modules/organization/domain/repositories/organization-command.repository';
import type { PrismaClient } from '@packages/api-db';
import type { OrganizationMemberCreateManyAndReturnArgs } from '@packages/api-db/generated/prisma/models';

export class PrismaOrganizationCommandRepository implements OrganizationCommandRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(organization: Organization): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      for (const event of organization.pullDomainEvents()) {
        if (event instanceof OrganizationCreatededEvent) {
          await tx.organization.create({
            data: {
              id: event.id.getValue(),
              title: event.title,
            },
          });
        }

        if (event instanceof OrganizationMembersAddedEvent) {
          const membersRecord: OrganizationMemberCreateManyAndReturnArgs['data'] =
            event.members.map((member) => ({
              id: member.id.getValue(),
              userId: member.userId.getValue(),
              organizationId: member.organizationId.getValue(),
              role: member.role,
            }));

          await tx.organizationMember.createMany({
            data: membersRecord,
          });
        }
      }
    });

    logger.debug({ details: organization }, 'infra');
  }

  async findOrganizationById(id: string): Promise<Organization | null> {
    const organization = await this.prisma.organization.findUnique({
      where: { id },
      include: { organizationMembers: true },
    });

    const members = organization?.organizationMembers;

    if (organization && members) {
      return OrganizationPrismaMapper.toOrganizationDomain(
        organization,
        members,
      );
    }

    return null;
  }
}
