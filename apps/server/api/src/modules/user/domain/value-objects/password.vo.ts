import { z } from 'zod';

import { InvalidPasswordHash } from '$modules/user/error/invalid-password-hash.error';

const passewordHashSchema = z
  .string()
  .regex(/^\$2[ayb]\$[0-9]{2}\$[./A-Za-z0-9]{53}$/);

export class UserPassword {
  private constructor(private readonly hashedPassword: string) {}

  static fromHashed(hashed: string) {
    const vaildation = passewordHashSchema.safeParse(hashed);

    if (!vaildation.success) {
      throw new InvalidPasswordHash(UserPassword.name);
    }

    return new UserPassword(vaildation.data);
  }

  getValue(): string {
    return this.hashedPassword;
  }
}
