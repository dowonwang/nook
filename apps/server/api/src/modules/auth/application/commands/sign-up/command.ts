import { UserEmailVo } from '$modules/user/domain';

export interface SignUpInput {
  email: string;
  name: string;
  password: string;
}

export class SignUpCommand {
  public readonly email: UserEmailVo;
  public readonly name: string;
  public readonly password: string;

  constructor(input: SignUpInput) {
    this.email = UserEmailVo.create(input.email);
    this.name = input.name;
    this.password = input.password;
  }
}
