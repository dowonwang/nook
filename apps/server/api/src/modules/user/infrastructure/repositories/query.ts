import { PrismaRepository } from '$shared/database';

import { UserPrismaMapper } from '../mappers/user';

import type {
  UserEntity,
  UserEmailVo,
  UserQueryRepository,
  UserUuidVo,
} from '$modules/user/domain';

export class PrismaUserQueryRepository
  extends PrismaRepository
  implements UserQueryRepository
{
  async findById(id: UserUuidVo): Promise<UserEntity | null> {
    const record = await this.client.user.findUnique({
      where: {
        id: id.getValue(),
      },
    });

    return record ? UserPrismaMapper.toDomain(record) : null;
  }

  async findManyByIds(ids: UserUuidVo[]): Promise<UserEntity[]> {
    const records = await this.client.user.findMany({
      where: {
        id: {
          in: ids.map((id) => id.getValue()),
        },
      },
    });

    return records.map((record) => UserPrismaMapper.toDomain(record));
  }

  async findByEmail(email: UserEmailVo): Promise<UserEntity | null> {
    const record = await this.client.user.findUnique({
      where: {
        email: email.getValue(),
      },
    });

    return record ? UserPrismaMapper.toDomain(record) : null;
  }
}
