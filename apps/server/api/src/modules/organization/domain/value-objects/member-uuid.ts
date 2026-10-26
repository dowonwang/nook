import { randomUUIDv7 } from 'bun';

import { Uuid } from '$shared/ddd';

export class OrganizationMemberUuidVo extends Uuid<OrganizationMemberUuidVo> {
  private constructor(value: string) {
    super(value);
  }

  static create(input: string): OrganizationMemberUuidVo {
    return new OrganizationMemberUuidVo(input);
  }

  static generate(): OrganizationMemberUuidVo {
    return new OrganizationMemberUuidVo(randomUUIDv7());
  }
}
