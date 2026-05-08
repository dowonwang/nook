import type { OrganizationQueryRepository } from '$modules/organization/domain/repositories/organization-query.repository';
import type { PrismaClient } from '@packages/api-db';

export class PrismaOrganizationQueryRepository implements OrganizationQueryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findOrganizationIdByUserIdAndTitle(
    userId: string,
    title: string,
  ): Promise<string | null> {
    const organization = await this.prisma.organization.findFirst({
      where: {
        title,
        organizationMembers: {
          some: {
            userId,
            role: 'ADMIN',
          },
        },
      },
      select: {
        id: true,
      },
    });

    return organization?.id ?? null;
  }
}
