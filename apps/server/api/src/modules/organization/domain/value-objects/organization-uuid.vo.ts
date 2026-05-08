import { randomUUIDv7 } from 'bun';

import { Uuid } from '$shared/ddd/value-object/uuid-vo.abstract';

export class OrganizationUuid extends Uuid<OrganizationUuid> {
  private constructor(value: string) {
    super(value);
  }

  static create(input: string): OrganizationUuid {
    return new OrganizationUuid(input);
  }

  static generate(): OrganizationUuid {
    return new OrganizationUuid(randomUUIDv7());
  }
}
