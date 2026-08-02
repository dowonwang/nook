import { compare, hash } from 'bcrypt';

import type { PasswordHasher } from '$modules/auth/application';

export class BcryptPasswordHasher implements PasswordHasher {
  constructor(private readonly saltRounds = 10) {}

  hash(rawPassword: string): Promise<string> {
    return hash(rawPassword, this.saltRounds);
  }

  compare(rawPassword: string, hashedPassword: string): Promise<boolean> {
    return compare(rawPassword, hashedPassword);
  }
}
