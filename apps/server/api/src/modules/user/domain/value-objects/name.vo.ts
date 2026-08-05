import { z } from 'zod';

import { InvalidUserName } from '$modules/user/error';
import { PrimitiveValueObject } from '$shared/ddd';

const schema = z.string().min(2).max(20);

export class UserName extends PrimitiveValueObject<string, UserName> {
  private constructor(value: string) {
    super(value);
  }

  static create(input: string): UserName {
    return new UserName(input);
  }

  protected validation(input: string): void {
    const validation = schema.safeParse(input);

    if (!validation.success) {
      throw new InvalidUserName(UserName.name);
    }
  }
}
