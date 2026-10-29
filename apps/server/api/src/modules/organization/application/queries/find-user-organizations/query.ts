import { UserUuidVo } from '$modules/user/domain';

export interface FindUserOrganizationsInput {
  userId: string;
}

export class FindUserOrganizationsQuery {
  public readonly userId: UserUuidVo;

  constructor(input: FindUserOrganizationsInput) {
    this.userId = UserUuidVo.create(input.userId);
  }
}
