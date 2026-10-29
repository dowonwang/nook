import type { AuthUserDto } from '../../dto/user';

export interface RefreshResult {
  accessToken: string;
  refreshToken: string;
  user: AuthUserDto;
}
