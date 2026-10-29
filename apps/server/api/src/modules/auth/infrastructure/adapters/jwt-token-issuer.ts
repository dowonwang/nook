import { decodeJwt, SignJWT } from 'jose';

import {
  AuthMissingJwtExpiresError,
  AuthMissingJwtSecretError,
} from '$modules/auth/error';

import type { TokenIssuerPort } from '$modules/auth/application';
import type { TokenClaimsVo } from '$modules/auth/domain';
import type { JWTPayload } from 'jose';

export class JwtTokenIssuerAdapter implements TokenIssuerPort {
  public readonly issueToken: (claims: TokenClaimsVo) => Promise<{
    token: string;
    payload: JWTPayload;
    expiresAt: Date | null;
  }>;

  constructor(
    secret: string | null | undefined,
    expiresIn: string | null | undefined,
    private readonly alg = 'HS256',
  ) {
    if (!secret) {
      throw new AuthMissingJwtSecretError(JwtTokenIssuerAdapter.name);
    }

    if (!expiresIn) {
      throw new AuthMissingJwtExpiresError(JwtTokenIssuerAdapter.name);
    }

    const secretBuffer = new TextEncoder().encode(secret);

    // 클로저 사용해서 내부 값 숨김
    this.issueToken = async (claims) => {
      const token = await new SignJWT(claims.toPrimitives())
        .setProtectedHeader({ alg: this.alg })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(secretBuffer);

      const payload = decodeJwt(token);

      return {
        token,
        payload,
        expiresAt: payload.exp ? new Date(payload.exp * 1000) : null,
      };
    };

    Object.freeze(this);
  }
}
