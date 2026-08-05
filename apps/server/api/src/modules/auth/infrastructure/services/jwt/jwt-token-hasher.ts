import { timingSafeEqual } from 'node:crypto';

import type { TokenHasher } from '$modules/auth/application';

export class JwtTokenHasher implements TokenHasher {
  readonly #secret: string;

  constructor(secret: string | undefined | null) {
    if (!secret) {
      throw new Error();
    }

    this.#secret = secret;
  }

  create(token: string): string {
    return new Bun.CryptoHasher('sha256', this.#secret)
      .update(token)
      .digest('hex');
  }

  compare(token: string, hashToken: string): boolean {
    const actual = Buffer.from(this.create(token), 'hex');
    const expected = Buffer.from(hashToken, 'hex');

    return (
      actual.length === expected.length && timingSafeEqual(actual, expected)
    );
  }
}
