import { timingSafeEqual } from 'node:crypto';

import { AuthMissingTokenHashSecretError } from '$modules/auth/error';

import type { TokenHasherPort } from '$modules/auth/application';

export class JwtTokenHasherAdapter implements TokenHasherPort {
  readonly #secret: string;

  constructor(secret: string | undefined | null) {
    if (!secret) {
      throw new AuthMissingTokenHashSecretError(JwtTokenHasherAdapter.name);
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
