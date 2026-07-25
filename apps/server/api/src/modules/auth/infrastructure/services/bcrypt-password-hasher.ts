import { compare, hash } from 'bcrypt';

import type { PasswordHaser } from '$modules/auth/domain';

export class BcryptPasswordHasher implements PasswordHaser {
  constructor(private readonly saltRounds = 10) {}

  hash(rawPassword: string): Promise<string> {
    return hash(rawPassword, this.saltRounds);
  }

  compare(rawPassword: string, hashedPassword: string): Promise<boolean> {
    return compare(rawPassword, hashedPassword);
  }
}
