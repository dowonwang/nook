import { randomUUIDv7 } from 'bun';

import { Uuid } from '$shared/ddd';

export class AuthSessionUuid extends Uuid<AuthSessionUuid> {
  private constructor(value: string) {
    super(value);
  }

  static create(input: string): AuthSessionUuid {
    return new AuthSessionUuid(input);
  }

  static generate(): AuthSessionUuid {
    return new AuthSessionUuid(randomUUIDv7());
  }
}
