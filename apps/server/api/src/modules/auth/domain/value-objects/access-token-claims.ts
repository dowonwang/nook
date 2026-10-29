import { z } from 'zod';

import { AuthInvalidAccessTokenClaimsError } from '$modules/auth/error';

import { TokenClaimsVo } from './token-claims';

const payloadSchema = z.object({
  sub: z.uuidv7(),
});

export type AccessTokenPayload = z.infer<typeof payloadSchema>;

export class AccessTokenClaimsVo extends TokenClaimsVo {
  protected readonly payload: AccessTokenPayload;

  private constructor(payload: AccessTokenPayload) {
    super();
    this.payload = { ...payload };
  }

  static create(payload: AccessTokenPayload): AccessTokenClaimsVo {
    try {
      const validated = payloadSchema.parse(payload);

      return new AccessTokenClaimsVo(validated);
    } catch {
      throw new AuthInvalidAccessTokenClaimsError(AccessTokenClaimsVo.name);
    }
  }
}
