import { compare, hash } from 'bcrypt';

import type { PasswordHasherPort } from '$modules/auth/application';

export class BcryptPasswordHasherAdapter implements PasswordHasherPort {
  constructor(private readonly saltRounds = 10) {}

  hash(rawPassword: string): Promise<string> {
    return hash(rawPassword, this.saltRounds);
  }

  compare(rawPassword: string, hashedPassword: string): Promise<boolean> {
    return compare(rawPassword, hashedPassword);
  }
}
