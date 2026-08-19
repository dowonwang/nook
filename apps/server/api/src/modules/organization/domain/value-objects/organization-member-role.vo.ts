import { z } from 'zod';

import { InvalidOrganizationMemberRole } from '$modules/organization/error/invalid-organization-member-role.error';
import { PrimitiveValueObject } from '$shared/ddd';

const schema = z.enum(['ADMIN', 'MAINTAINER', 'MEMBER']);

export type OrganizationMemberRoleValue = z.infer<typeof schema>;

export class OrganizationMemberRole extends PrimitiveValueObject<
  OrganizationMemberRoleValue,
  OrganizationMemberRole
> {
  private constructor(value: OrganizationMemberRoleValue) {
    super(value);
  }

  static create(input: OrganizationMemberRoleValue): OrganizationMemberRole {
    return new OrganizationMemberRole(input);
  }

  protected validation(input: OrganizationMemberRoleValue): void {
    const validation = schema.safeParse(input);

    if (!validation.success) {
      throw new InvalidOrganizationMemberRole(OrganizationMemberRole.name);
    }
  }

  canAddMember(): boolean {
    const allowRole: OrganizationMemberRoleValue[] = ['ADMIN', 'MAINTAINER'];
    return allowRole.includes(this.getValue());
  }
}
