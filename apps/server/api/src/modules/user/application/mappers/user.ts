import type { UserEntity } from '$modules/user/domain';
import type { UserDetailDto } from '../dto/detail';

export const UserDtoMapper = {
  fromEntity(user: UserEntity): UserDetailDto {
    const { id, email, name } = user.toSnapshot();
    return { id, email, name };
  },
} as const;
