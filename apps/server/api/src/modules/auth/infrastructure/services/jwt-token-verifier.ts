import { jwtVerify } from 'jose';

import { AccessTokenClaims } from '$modules/auth/domain/value-objects/access-token-claims.vo';
import { RefreshTokenClaims } from '$modules/auth/domain/value-objects/refresh-token-claims.vo';
import { InvalidAccessTokenClaims } from '$modules/auth/error/invalid-access-token-claims.error';
import { InvalidRefreshTokenClaims } from '$modules/auth/error/invalid-refresh-token-claims.error';
import { MissingJwtSecret } from '$modules/auth/error/missing-jwt-secret.error';

import type { TokenVerifier } from '$modules/auth/domain/services/token-verifier';
import type { AccessTokenPayload } from '$modules/auth/domain/value-objects/access-token-claims.vo';
import type { RefreshTokenPayload } from '$modules/auth/domain/value-objects/refresh-token-claims.vo';

type Secret = string | null | undefined;

export class JwtTokenVerifier implements TokenVerifier {
  public readonly verifyAccessToken: (
    token: string,
  ) => Promise<AccessTokenClaims>;
  public readonly verifyRefreshToken: (
    token: string,
  ) => Promise<RefreshTokenClaims>;

  constructor(accessSecret: Secret, refreshSecret: Secret) {
    if (!accessSecret || !refreshSecret) {
      throw new MissingJwtSecret(JwtTokenVerifier.name);
    }

    const accessSecretBuffer = new TextEncoder().encode(accessSecret);
    const refreshSecretBuffer = new TextEncoder().encode(refreshSecret);

    this.verifyAccessToken = async (token: string) => {
      try {
        const { payload } = await jwtVerify(token, accessSecretBuffer, {
          algorithms: ['HS256'],
        });

        const claims = AccessTokenClaims.create(payload as AccessTokenPayload);

        return claims;
      } catch {
        throw new InvalidAccessTokenClaims(JwtTokenVerifier.name);
      }
    };

    this.verifyRefreshToken = async (token: string) => {
      try {
        const { payload } = await jwtVerify(token, refreshSecretBuffer, {
          algorithms: ['HS256'],
        });

        const claims = RefreshTokenClaims.create(
          payload as RefreshTokenPayload,
        );

        return claims;
      } catch {
        throw new InvalidRefreshTokenClaims(JwtTokenVerifier.name);
      }
    };
  }
}
