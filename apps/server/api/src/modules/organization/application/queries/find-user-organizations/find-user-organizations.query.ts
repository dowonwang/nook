import { UserUuid } from '$modules/user/domain';

import type { OrganizationUuid } from '$modules/organization/domain';

export interface FindUserOrganizationsInput {
  userId: string;
}

export class FindUserOrganizationsQuery {
  public readonly userId: OrganizationUuid;

  constructor(input: FindUserOrganizationsInput) {
    this.userId = UserUuid.create(input.userId);
  }
}
