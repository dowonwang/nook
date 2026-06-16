import { z } from 'zod';

import { InvalidAccessTokenClaims } from '$modules/auth/error/invalid-access-token-claims.error';

const payloadSchema = z.object({
  sub: z.uuidv7(),
});

export type AccessTokenPayload = z.infer<typeof payloadSchema>;

export class AccessTokenClaims {
  private constructor(private readonly payload: AccessTokenPayload) {}

  static create(payload: AccessTokenPayload): AccessTokenClaims {
    try {
      const vaildated = payloadSchema.parse(payload);

      return new AccessTokenClaims(vaildated);
    } catch {
      throw new InvalidAccessTokenClaims(AccessTokenClaims.name);
    }
  }

  getSubject(): string {
    return this.payload.sub;
  }

  toPrimitives(): AccessTokenPayload {
    return this.payload;
  }
}
