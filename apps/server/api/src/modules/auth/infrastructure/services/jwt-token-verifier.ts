import { jwtVerify } from 'jose';

import { AccessTokenClaims } from '$modules/auth/domain/value-objects/access-token-claims.vo';
import { InvalidAccessTokenClaims } from '$modules/auth/error/invalid-access-token-claims.error';
import { MissingJwtSecret } from '$modules/auth/error/missing-jwt-secret.error';

import type { TokenVerifier } from '$modules/auth/domain/services/token-verifier';
import type { AccessTokenPayload } from '$modules/auth/domain/value-objects/access-token-claims.vo';

export class JwtTokenVerifier implements TokenVerifier {
  public readonly verifyAccessToken: (
    token: string,
  ) => Promise<AccessTokenClaims>;

  constructor(secret: string | null | undefined) {
    if (!secret) {
      throw new MissingJwtSecret(JwtTokenVerifier.name);
    }

    const secretBuffer = new TextEncoder().encode(secret);

    this.verifyAccessToken = async (token: string) => {
      try {
        const { payload } = await jwtVerify(token, secretBuffer, {
          algorithms: ['HS256'],
        });

        const claims = AccessTokenClaims.create(payload as AccessTokenPayload);

        return claims;
      } catch {
        throw new InvalidAccessTokenClaims(JwtTokenVerifier.name);
      }
    };
  }
}
