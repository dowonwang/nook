import type { UserDetailDto } from '$modules/user/application';

export interface RefreshResult {
  accessToken: string;
  refreshToken: string;
  user: UserDetailDto;
}
