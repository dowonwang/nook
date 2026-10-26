import { z } from 'zod';

import { InvalidUserEmailError } from '$modules/user/error';
import { PrimitiveValueObject } from '$shared/ddd';

const schema = z.email();

export class UserEmailVo extends PrimitiveValueObject<string, UserEmailVo> {
  private constructor(value: string) {
    super(value);
  }

  static create(input: string): UserEmailVo {
    return new UserEmailVo(input);
  }

  protected validation(input: string): void {
    const validation = schema.safeParse(input);

    if (!validation.success) {
      throw new InvalidUserEmailError(UserEmailVo.name);
    }
  }
}
