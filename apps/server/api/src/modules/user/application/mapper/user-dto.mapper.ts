import { UserTimeStampsRequired } from '$modules/user/error';

import type { User } from '$modules/user/domain';
import type { UserDetailDto } from '../dto/user-detail.dto';

const name = Symbol('UserDtoMapper');

export const UserDtoMapper = {
  fromEntity(entity: User): UserDetailDto {
    if (!(entity.createdAt && entity.updatedAt)) {
      throw new UserTimeStampsRequired(name.toString());
    }

    return {
      id: entity.id.getValue(),
      email: entity.email.getValue(),
      name: entity.name.getValue(),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  },
} as const;
