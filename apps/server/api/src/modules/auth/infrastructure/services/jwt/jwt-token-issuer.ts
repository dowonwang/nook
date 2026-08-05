import { decodeJwt, SignJWT } from 'jose';

import { MissingJwtExpires, MissingJwtSecret } from '$modules/auth/error';

import type { TokenIssuer } from '$modules/auth/application';
import type { TokenClaims } from '$modules/auth/domain';
import type { JWTPayload } from 'jose';

export class JwtTokenIssuer implements TokenIssuer {
  public readonly issueToken: (claims: TokenClaims) => Promise<{
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
      throw new MissingJwtSecret(JwtTokenIssuer.name);
    }

    if (!expiresIn) {
      throw new MissingJwtExpires(JwtTokenIssuer.name);
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
