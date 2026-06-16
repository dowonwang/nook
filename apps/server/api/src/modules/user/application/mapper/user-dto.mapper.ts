import { UserTimeStampsRequired } from '$modules/user/error/user-timestamps-required.error';

import type { UserDetailDto } from '$modules/user/application/dto/user-detail.dto';
import type { User } from '$modules/user/domain/entities/user.entity';

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
