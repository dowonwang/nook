import { z } from 'zod';

import { AuthInvalidRefreshTokenClaimsError } from '$modules/auth/error';

import { TokenClaimsVo } from './token-claims';

const payloadSchema = z.object({
  sub: z.uuidv7(),
  jti: z.uuidv7(),
});

export type RefreshTokenPayload = z.infer<typeof payloadSchema>;

export class RefreshTokenClaimsVo extends TokenClaimsVo {
  protected readonly payload: RefreshTokenPayload;

  private constructor(payload: RefreshTokenPayload) {
    super();
    this.payload = { ...payload };
  }

  static create(payload: RefreshTokenPayload): RefreshTokenClaimsVo {
    try {
      const validated = payloadSchema.parse(payload);

      return new RefreshTokenClaimsVo(validated);
    } catch {
      throw new AuthInvalidRefreshTokenClaimsError(RefreshTokenClaimsVo.name);
    }
  }
}
