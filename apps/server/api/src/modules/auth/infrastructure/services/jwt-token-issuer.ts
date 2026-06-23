import { SignJWT } from 'jose';

import { MissingJwtExpires } from '$modules/auth/error/missing-jwt-expires.error';
import { MissingJwtSecret } from '$modules/auth/error/missing-jwt-secret.error';

import type { TokenIssuer } from '$modules/auth/domain/services/token-issuer';
import type { TokenClaims } from '$modules/auth/domain/value-objects/abstract/token-claims.base';

export class JwtTokenIssuer implements TokenIssuer {
  public readonly issueToken: (claims: TokenClaims) => Promise<string>;

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
    this.issueToken = async (claims) => {
      return await new SignJWT(claims.toPrimitives())
        .setProtectedHeader({ alg: this.alg })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(secretBuffer);
    };

    Object.freeze(this);
  }
}
