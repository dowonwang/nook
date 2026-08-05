import { z } from 'zod';

import { InvalidUserEmail } from '$modules/user/error';
import { PrimitiveValueObject } from '$shared/ddd';

const schema = z.email();

export class UserEmail extends PrimitiveValueObject<string, UserEmail> {
  private constructor(value: string) {
    super(value);
  }

  static create(input: string): UserEmail {
    return new UserEmail(input);
  }

  protected validation(input: string): void {
    const validation = schema.safeParse(input);

    if (!validation.success) {
      throw new InvalidUserEmail(UserEmail.name);
    }
  }
}
