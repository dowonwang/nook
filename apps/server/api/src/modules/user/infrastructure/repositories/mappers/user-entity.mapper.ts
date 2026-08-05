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
      email: UserEmail.create(record.email),
      name: UserName.create(record.name),
      password: UserPassword.fromHashed(record.password),
    });
  },
} as const;
