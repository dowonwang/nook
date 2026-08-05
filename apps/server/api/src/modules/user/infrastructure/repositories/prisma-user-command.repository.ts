import { UserPrismaMapper } from './mappers/user-entity.mapper';

import type { User, UserCommandRepository } from '$modules/user/domain';
import type { PrismaClient } from '@packages/api-db';

export class PrismaUserCommandRepository implements UserCommandRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<User | null> {
    const record = await this.prisma.user.findUnique({ where: { id } });

    return record ? UserPrismaMapper.toDomain(record) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const record = await this.prisma.user.findUnique({
      where: { email },
    });

    return record ? UserPrismaMapper.toDomain(record) : null;
  }

  async save(user: User): Promise<void> {
    const { id, ...data } = user.toSnapshot();

    await this.prisma.user.upsert({
      where: { id },
      create: { id, ...data },
      update: data,
    });
  }
}
