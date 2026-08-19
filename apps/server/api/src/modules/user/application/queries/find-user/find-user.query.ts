import { UserEmail } from '$modules/user/domain';

export interface FindByEmailUserInput {
  email: string;
}

export class FindByEmailUserQuery {
  public readonly email: UserEmail;

  constructor(param: FindByEmailUserInput) {
    this.email = UserEmail.create(param.email);
  }
}
