import {
  User,
  UserEmail,
  UserName,
  UserPassword,
  UserUuid,
} from '$modules/user/domain';

import type { User as PrismaUser } from '@packages/api-db';

export const UserPrismaMapper = {
  toDomain(record: PrismaUser): User {
    return User.create(UserUuid.create(record.id), {
      ...record,
      email: UserEmail.create(record.email),
      password: UserPassword.fromHashed(record.password),
      name: UserName.create(record.name),
    });
  },
} as const;
