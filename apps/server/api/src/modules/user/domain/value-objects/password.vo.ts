import { z } from 'zod';

import { InvalidPasswordHash } from '$modules/user/error';
import { PrimitiveValueObject } from '$shared/ddd';

const passewordHashSchema = z
  .string()
  .regex(/^\$2[ayb]\$[0-9]{2}\$[./A-Za-z0-9]{53}$/);

export class UserPassword extends PrimitiveValueObject<string, UserPassword> {
  private constructor(hashedPassword: string) {
    super(hashedPassword);
  }

  static fromHashed(hashed: string) {
    return new UserPassword(hashed);
  }

  protected validation(input: string): void {
    const vaildation = passewordHashSchema.safeParse(input);

    if (!vaildation.success) {
      throw new InvalidPasswordHash(UserPassword.name);
    }
  }
}
