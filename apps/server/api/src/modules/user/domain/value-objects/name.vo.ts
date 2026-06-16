import { z } from 'zod';

import { InvalidUserName } from '$modules/user/error/invalid-user-name.error';

const schema = z.string().min(2).max(20);

export class UserName {
  private constructor(private readonly value: string) {}

  static create(input: string): UserName {
    const validation = schema.safeParse({ name: input });

    if (!validation.success) {
      throw new InvalidUserName(UserName.name);
    }

    return new UserName(validation.data);
  }

  equals(other: UserName): boolean {
    return this.value === other.value;
  }

  getValue(): string {
    return this.value;
  }
}
