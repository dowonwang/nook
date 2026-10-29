import { UserEmailVo } from '$modules/user/domain';

export interface FindUserByEmailInput {
  email: string;
}

export class FindUserByEmailQuery {
  public readonly email: UserEmailVo;

  constructor(param: FindUserByEmailInput) {
    this.email = UserEmailVo.create(param.email);
  }
}
