import { Prisma } from '@packages/api-db';

import {
  OrganizationCreatedEvent,
  OrganizationMembersAddedEvent,
} from '$modules/organization/domain';
import { DuplicateOrganizationSlugError } from '$modules/organization/error';
import { PrismaRepository } from '$shared/database';
import { createLogger } from '$shared/logger';

import { OrganizationPrismaMapper } from '../mappers/organization';

import type {
  OrganizationAggregate,
  OrganizationCommandRepository,
  OrganizationUuidVo,
} from '$modules/organization/domain';
import type { OrganizationMemberCreateManyAndReturnArgs } from '@packages/api-db/generated/prisma/models';

export class PrismaOrganizationCommandRepository
  extends PrismaRepository
  implements OrganizationCommandRepository
{
  private readonly logger = createLogger(
    PrismaOrganizationCommandRepository.name,
  );

  async save(organization: OrganizationAggregate): Promise<void> {
    await this.transaction(async () => {
      for (const event of organization.pullDomainEvents()) {
        if (event instanceof OrganizationCreatedEvent) {
          await this.createOrganization(event);
        }

        if (event instanceof OrganizationMembersAddedEvent) {
          const membersRecord: OrganizationMemberCreateManyAndReturnArgs['data'] =
            event.members.map((member) => ({
              id: member.id.getValue(),
              userId: member.userId.getValue(),
              organizationId: member.organizationId.getValue(),
              role: member.role.getValue(),
            }));

          await this.client.organizationMember.createMany({
            data: membersRecord,
          });
        }
      }
    });

    this.logger.debug({ details: organization }, 'Organization Save');
  }

  private async createOrganization(
    event: OrganizationCreatedEvent,
  ): Promise<void> {
    try {
      await this.client.organization.create({
        data: {
          id: event.id.getValue(),
          title: event.title,
          slug: event.slug.getValue(),
        },
      });
    } catch (error) {
      // organization의 unique는 id(UUIDv7, 충돌 없음)와 slug뿐이므로 P2002는 slug 충돌
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new DuplicateOrganizationSlugError(
          PrismaOrganizationCommandRepository.name,
        );
      }

      throw error;
    }
  }

  async findOrganizationById(
    id: OrganizationUuidVo,
  ): Promise<OrganizationAggregate | null> {
    const organization = await this.client.organization.findUnique({
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
