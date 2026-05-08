import { randomUUIDv7 } from 'bun';

import { Uuid } from '$shared/ddd/value-object/uuid-vo.abstract';

export class OrganizationMemberUuid extends Uuid<OrganizationMemberUuid> {
  private constructor(value: string) {
    super(value);
  }

  static create(input: string): OrganizationMemberUuid {
    return new OrganizationMemberUuid(input);
  }

  static generate(): OrganizationMemberUuid {
    return new OrganizationMemberUuid(randomUUIDv7());
  }
}
