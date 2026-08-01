import type { UserDetailDto } from '$modules/user/application';

export interface SignInCommand {
  email: string;
  password: string;
}

export interface SingInResult {
  accessToken: string;
  refreshToken: string;
  user: UserDetailDto;
}
