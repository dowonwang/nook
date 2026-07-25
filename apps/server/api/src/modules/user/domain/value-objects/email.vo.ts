import { z } from 'zod';

import { InvalidUserEmail } from '$modules/user/error';

const schema = z.email();

export class UserEmail {
  private constructor(private readonly value: string) {}

  static create(input: string): UserEmail {
    const validation = schema.safeParse(input);

    if (!validation.success) {
      throw new InvalidUserEmail(UserEmail.name);
    }

    return new UserEmail(validation.data);
  }

  equals(other: UserEmail): boolean {
    return this.value === other.value;
  }

  getValue(): string {
    return this.value;
  }
}
