import {
  OrganizationCreatedEvent,
  OrganizationMembersAddedEvent,
} from '$modules/organization/domain';
import { createLogger } from '$shared/logger';

import { OrganizationPrismaMapper } from '../mappers/organization-prisma.mapper';

import type {
  Organization,
  OrganizationCommandRepository,
  OrganizationUuid,
} from '$modules/organization/domain';
import type { PrismaClient } from '@packages/api-db';
import type { OrganizationMemberCreateManyAndReturnArgs } from '@packages/api-db/generated/prisma/models';

export class PrismaOrganizationCommandRepository implements OrganizationCommandRepository {
  private readonly logger = createLogger(
    PrismaOrganizationCommandRepository.name,
  );

  constructor(private readonly prisma: PrismaClient) {}

  async save(organization: Organization): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      for (const event of organization.pullDomainEvents()) {
        if (event instanceof OrganizationCreatedEvent) {
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
              role: member.role.getValue(),
            }));

          await tx.organizationMember.createMany({
            data: membersRecord,
          });
        }
      }
    });

    this.logger.debug({ details: organization }, 'Organization Save');
  }

  async findOrganizationById(
    id: OrganizationUuid,
  ): Promise<Organization | null> {
    const organization = await this.prisma.organization.findUnique({
      where: { id: id.getValue() },
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
