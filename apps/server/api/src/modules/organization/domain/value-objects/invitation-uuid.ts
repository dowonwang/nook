import { randomUUIDv7 } from 'bun';

import { Uuid } from '$shared/ddd';

export class OrganizationInvitationUuidVo extends Uuid<OrganizationInvitationUuidVo> {
  private constructor(value: string) {
    super(value);
  }

  static create(input: string): OrganizationInvitationUuidVo {
    return new OrganizationInvitationUuidVo(input);
  }

  static generate(): OrganizationInvitationUuidVo {
    return new OrganizationInvitationUuidVo(randomUUIDv7());
  }
}
