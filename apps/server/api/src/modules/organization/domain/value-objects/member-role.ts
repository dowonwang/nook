import { z } from 'zod';

import { InvalidOrganizationMemberRoleError } from '$modules/organization/error';
import { PrimitiveValueObject } from '$shared/ddd';

const schema = z.enum(['ADMIN', 'MAINTAINER', 'MEMBER']);

export type OrganizationMemberRoleValue = z.infer<typeof schema>;

// 숫자가 클수록 높은 권한
const ROLE_RANK: Record<OrganizationMemberRoleValue, number> = {
  ADMIN: 3,
  MAINTAINER: 2,
  MEMBER: 1,
};

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

  // 자신보다 높은 역할은 부여할 수 없음
  canGrant(role: OrganizationMemberRoleVo): boolean {
    return ROLE_RANK[this.getValue()] >= ROLE_RANK[role.getValue()];
  }
}
