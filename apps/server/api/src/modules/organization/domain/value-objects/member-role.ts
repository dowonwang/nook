import { z } from 'zod';

import { InvalidOrganizationMemberRoleError } from '$modules/organization/error';
import { PrimitiveValueObject } from '$shared/ddd';

const schema = z.enum(['ADMIN', 'MAINTAINER', 'MEMBER']);

export type OrganizationMemberRoleValue = z.infer<typeof schema>;

export class OrganizationMemberRoleVo extends PrimitiveValueObject<
  OrganizationMemberRoleValue,
  OrganizationMemberRoleVo
> {
  private constructor(value: OrganizationMemberRoleValue) {
    super(value);
  }

  static create(input: OrganizationMemberRoleValue): OrganizationMemberRoleVo {
    return new OrganizationMemberRoleVo(input);
  }

  protected validation(input: OrganizationMemberRoleValue): void {
    const validation = schema.safeParse(input);

    if (!validation.success) {
      throw new InvalidOrganizationMemberRoleError(
        OrganizationMemberRoleVo.name,
      );
    }
  }

  canAddMember(): boolean {
    const allowRole: OrganizationMemberRoleValue[] = ['ADMIN', 'MAINTAINER'];
    return allowRole.includes(this.getValue());
  }
}
