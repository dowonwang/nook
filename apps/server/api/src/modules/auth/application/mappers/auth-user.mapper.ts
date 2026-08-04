import type { User } from '$modules/user/domain';
import type { AuthUserDto } from '../dto/auth-user.dto';

export const AuthUserDtoMapper = {
  fromEntity(user: User): AuthUserDto {
    const { id, email, name } = user.toSnapshot();
    return { id, email, name };
  },
};
