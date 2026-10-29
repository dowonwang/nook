import { UserUuidVo } from '$modules/user/domain';

export interface CreateOrganizationInput {
  userId: string;
  title: string;
}

export interface CreateOrganizationResult {
  id: string;
  title: string;
  slug: string;
}

export class CreateOrganizationCommand {
  public readonly userId: UserUuidVo;
  public readonly title: string;

  constructor(input: CreateOrganizationInput) {
    this.userId = UserUuidVo.create(input.userId);
    this.title = input.title;
  }
}
