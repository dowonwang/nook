import { PrismaRepository } from '$shared/database';

import { UserPrismaMapper } from '../mappers/user';

import type { UserEntity, UserCommandRepository } from '$modules/user/domain';

export class PrismaUserCommandRepository
  extends PrismaRepository
  implements UserCommandRepository
{
  async findById(id: string): Promise<UserEntity | null> {
    const record = await this.client.user.findUnique({ where: { id } });

    return record ? UserPrismaMapper.toDomain(record) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const record = await this.client.user.findUnique({
      where: { email },
    });

    return record ? UserPrismaMapper.toDomain(record) : null;
  }

  async save(user: UserEntity): Promise<void> {
    const { id, ...data } = user.toSnapshot();

    await this.client.user.upsert({
      where: { id },
      create: { id, ...data },
      update: data,
    });
  }
}
