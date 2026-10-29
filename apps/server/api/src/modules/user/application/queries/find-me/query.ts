import { UserUuidVo } from '$modules/user/domain';

export interface FindMeInput {
  id: string;
}

export class FindMeQuery {
  public readonly id: UserUuidVo;

  constructor(input: FindMeInput) {
    this.id = UserUuidVo.create(input.id);
  }
}
