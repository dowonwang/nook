import type { AuthUserDto } from '../../dto/auth-user.dto';

export interface SignInCommand {
  email: string;
  password: string;
}

export interface SingInResult {
  accessToken: string;
  refreshToken: string;
  user: AuthUserDto;
}
