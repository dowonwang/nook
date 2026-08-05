import type { AuthUserDto } from '../../dto/auth-user.dto';

export interface RefreshResult {
  accessToken: string;
  refreshToken: string;
  user: AuthUserDto;
}
