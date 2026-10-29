import { randomUUIDv7 } from 'bun';

import { Uuid } from '$shared/ddd';

export class AuthSessionUuidVo extends Uuid<AuthSessionUuidVo> {
  private constructor(value: string) {
    super(value);
  }

  static create(input: string): AuthSessionUuidVo {
    return new AuthSessionUuidVo(input);
  }

  static generate(): AuthSessionUuidVo {
    return new AuthSessionUuidVo(randomUUIDv7());
  }
}
