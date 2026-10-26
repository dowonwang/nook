import type { UserEntity } from '$modules/user/domain';
import type { AuthUserDto } from '../dto/user';

export const AuthUserDtoMapper = {
  fromEntity(user: UserEntity): AuthUserDto {
    const { id, email, name } = user.toSnapshot();
    return { id, email, name };
  },
};
