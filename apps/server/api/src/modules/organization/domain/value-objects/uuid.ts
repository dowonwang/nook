import { randomUUIDv7 } from 'bun';

import { Uuid } from '$shared/ddd';

export class OrganizationUuidVo extends Uuid<OrganizationUuidVo> {
  private constructor(value: string) {
    super(value);
  }

  static create(input: string): OrganizationUuidVo {
    return new OrganizationUuidVo(input);
  }

  static generate(): OrganizationUuidVo {
    return new OrganizationUuidVo(randomUUIDv7());
  }
}
