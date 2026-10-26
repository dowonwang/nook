import { UserUuidVo } from '$modules/user/domain';

import type { OrganizationUuidVo } from '$modules/organization/domain';

export interface FindUserOrganizationsInput {
  userId: string;
}

export class FindUserOrganizationsQuery {
  public readonly userId: OrganizationUuidVo;

  constructor(input: FindUserOrganizationsInput) {
    this.userId = UserUuidVo.create(input.userId);
  }
}
