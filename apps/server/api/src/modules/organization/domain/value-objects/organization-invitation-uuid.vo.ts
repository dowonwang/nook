import { randomUUIDv7 } from 'bun';

import { Uuid } from '$shared/ddd';

export class OrganizationInvitationUuid extends Uuid<OrganizationInvitationUuid> {
  private constructor(value: string) {
    super(value);
  }

  static create(input: string): OrganizationInvitationUuid {
    return new OrganizationInvitationUuid(input);
  }

  static generate(): OrganizationInvitationUuid {
    return new OrganizationInvitationUuid(randomUUIDv7());
  }
}
