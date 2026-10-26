import {
  UserEntity,
  UserEmailVo,
  UserNameVo,
  UserPasswordVo,
  UserUuidVo,
} from '$modules/user/domain';

import type { User as PrismaUser } from '@packages/api-db';

export const UserPrismaMapper = {
  toDomain(record: PrismaUser): UserEntity {
    return UserEntity.create(UserUuidVo.create(record.id), {
      email: UserEmailVo.create(record.email),
      name: UserNameVo.create(record.name),
      password: UserPasswordVo.fromHashed(record.password),
    });
  },
} as const;
