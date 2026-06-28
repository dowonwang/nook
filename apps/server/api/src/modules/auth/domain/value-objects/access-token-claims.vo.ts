import { z } from 'zod';

import { TokenClaims } from '$modules/auth/domain/value-objects/abstract/token-claims.base';
import { InvalidAccessTokenClaims } from '$modules/auth/error/invalid-access-token-claims.error';

const payloadSchema = z.object({
  sub: z.uuidv7(),
});

export type AccessTokenPayload = z.infer<typeof payloadSchema>;

export class AccessTokenClaims extends TokenClaims {
  protected readonly payload: AccessTokenPayload;

  private constructor(payload: AccessTokenPayload) {
    super();
    this.payload = { ...payload };
  }

  static create(payload: AccessTokenPayload): AccessTokenClaims {
    try {
      const validated = payloadSchema.parse(payload);

      return new AccessTokenClaims(validated);
    } catch {
      throw new InvalidAccessTokenClaims(AccessTokenClaims.name);
    }
  }
}
