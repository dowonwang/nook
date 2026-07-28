import { UserEntityMapper } from '../mappers/user-entity.mapper';

import type { User, UserQueryRepository } from '$modules/user/domain';
import type { PrismaClient } from '@packages/api-db';

export class PrismaUserQueryRepository implements UserQueryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<User | null> {
    const record = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return record ? UserEntityMapper.fromRecord(record) : null;
  }
}
