import { UserEmailVo } from '$modules/user/domain';

import type { AuthUserDto } from '../../dto/user';

export interface SignInInput {
  email: string;
  password: string;
}

export interface SignInResult {
  accessToken: string;
  refreshToken: string;
  user: AuthUserDto;
}

export class SignInCommand {
  public readonly email: UserEmailVo;
  public readonly password: string;

  constructor(input: SignInInput) {
    this.email = UserEmailVo.create(input.email);
    this.password = input.password;
  }
}
