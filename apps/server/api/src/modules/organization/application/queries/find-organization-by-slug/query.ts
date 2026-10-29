import { OrganizationSlugVo } from '$modules/organization/domain';
import { UserUuidVo } from '$modules/user/domain';

export interface FindOrganizationBySlugInput {
  userId: string;
  slug: string;
}

export class FindOrganizationBySlugQuery {
  public readonly userId: UserUuidVo;
  public readonly slug: OrganizationSlugVo;

  constructor(input: FindOrganizationBySlugInput) {
    this.userId = UserUuidVo.create(input.userId);
    this.slug = OrganizationSlugVo.create(input.slug);
  }
}
