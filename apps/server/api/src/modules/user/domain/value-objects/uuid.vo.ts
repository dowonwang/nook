import { randomUUIDv7 } from 'bun';

import { Uuid } from '$shared/ddd';

export class UserUuid extends Uuid<UserUuid> {
  private constructor(value: string) {
    super(value);
  }

  static create(input: string): UserUuid {
    return new UserUuid(input);
  }

  static generate(): UserUuid {
    return new UserUuid(randomUUIDv7());
  }
}
