import { SignJWT } from 'jose';

import { MissingJwtExpires } from '$modules/auth/error/missing-jwt-expires.error';
import { MissingJwtSecret } from '$modules/auth/error/missing-jwt-secret.error';

import type { TokenIssuer } from '$modules/auth/domain/services/token-issuer';
import type { AccessTokenClaims } from '$modules/auth/domain/value-objects/access-token-claims.vo';

export class JwtTokenIssuer implements TokenIssuer {
  public readonly issueAccessToken: (
    payload: AccessTokenClaims,
  ) => Promise<string>;

  constructor(
    secret: string | null | undefined,
    expiresIn: string | null | undefined,
    private readonly alg = 'HS256',
  ) {
    if (!secret) {
      throw new MissingJwtSecret(JwtTokenIssuer.name);
    }

    if (!expiresIn) {
      throw new MissingJwtExpires(JwtTokenIssuer.name);
    }

    const secretBuffer = new TextEncoder().encode(secret);

    // 클로저 사용해서 내부 값 숨김
    this.issueAccessToken = async (payload) => {
      return await new SignJWT(payload.toPrimitives())
        .setProtectedHeader({ alg: this.alg })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(secretBuffer);
    };

    Object.freeze(this);
  }
}
