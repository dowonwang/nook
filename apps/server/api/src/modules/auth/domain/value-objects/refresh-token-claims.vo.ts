import { z } from 'zod';

import { TokenClaims } from '$modules/auth/domain/value-objects/abstract/token-claims.base';
import { InvalidRefreshTokenClaims } from '$modules/auth/error/invalid-refresh-token-claims.erro';

const payloadSchema = z.object({
  sub: z.uuidv7(),
  jti: z.uuidv7(),
});

export type RefreshTokenPayload = z.infer<typeof payloadSchema>;

export class RefreshTokenClaims extends TokenClaims {
  protected readonly payload: RefreshTokenPayload;

  private constructor(payload: RefreshTokenPayload) {
    super();
    this.payload = payload;
  }

  static create(payload: RefreshTokenPayload): RefreshTokenClaims {
    try {
      const validated = payloadSchema.parse(payload);

      return new RefreshTokenClaims(validated);
    } catch {
      throw new InvalidRefreshTokenClaims(RefreshTokenClaims.name);
    }
  }
}
