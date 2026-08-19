import { UserPrismaMapper } from './mappers/user-entity.mapper';

import type {
  User,
  UserEmail,
  UserQueryRepository,
  UserUuid,
} from '$modules/user/domain';
import type { PrismaClient } from '@packages/api-db';

export class PrismaUserQueryRepository implements UserQueryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: UserUuid): Promise<User | null> {
    const record = await this.prisma.user.findUnique({
      where: {
        id: id.getValue(),
      },
    });

    return record ? UserPrismaMapper.toDomain(record) : null;
  }

  async findManyByIds(ids: UserUuid[]): Promise<User[]> {
    const records = await this.prisma.user.findMany({
      where: {
        id: {
          in: ids.map((id) => id.getValue()),
        },
      },
    });

    return records.map((record) => UserPrismaMapper.toDomain(record));
  }

  async findByEmail(email: UserEmail): Promise<User | null> {
    const record = await this.prisma.user.findUnique({
      where: {
        email: email.getValue(),
      },
    });

    return record ? UserPrismaMapper.toDomain(record) : null;
  }
}
