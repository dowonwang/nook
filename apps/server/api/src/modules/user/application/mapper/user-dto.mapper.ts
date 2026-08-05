import type { User } from '$modules/user/domain';
import type { UserDetailDto } from '../dto/user-detail.dto';

export const UserDtoMapper = {
  fromEntity(user: User): UserDetailDto {
    const { id, email, name } = user.toSnapshot();
    return { id, email, name };
  },
} as const;
