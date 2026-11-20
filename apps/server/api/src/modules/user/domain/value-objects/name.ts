import { z } from 'zod';

import { PrimitiveValueObject } from '$shared/ddd';

import { InvalidUserNameError } from '$modules/user/error';

const schema = z.string().min(2).max(20);

export class UserNameVo extends PrimitiveValueObject<string, UserNameVo> {
  private constructor(value: string) {
    super(value);
  }

  static create(input: string): UserNameVo {
    return new UserNameVo(input);
  }

  protected validation(input: string): void {
    const validation = schema.safeParse(input);

    if (!validation.success) {
      throw new InvalidUserNameError(UserNameVo.name);
    }
  }
}
