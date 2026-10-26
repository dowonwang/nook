import { randomUUIDv7 } from 'bun';

import { Uuid } from '$shared/ddd';

export class UserUuidVo extends Uuid<UserUuidVo> {
  private constructor(value: string) {
    super(value);
  }

  static create(input: string): UserUuidVo {
    return new UserUuidVo(input);
  }

  static generate(): UserUuidVo {
    return new UserUuidVo(randomUUIDv7());
  }
}
