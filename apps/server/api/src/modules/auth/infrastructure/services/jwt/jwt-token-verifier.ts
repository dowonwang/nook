import { jwtVerify } from 'jose';

import { AccessTokenClaims, RefreshTokenClaims } from '$modules/auth/domain';
import {
  InvalidAccessTokenClaims,
  InvalidRefreshTokenClaims,
  JwtTokenExpired,
  MissingJwtSecret,
} from '$modules/auth/error';

import type { TokenVerifier } from '$modules/auth/application';
import type {
  AccessTokenPayload,
  RefreshTokenPayload,
} from '$modules/auth/domain';

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
      } catch (error: unknown) {
        // 토큰 만료 예외 처리
        if (error && typeof error === 'object' && 'code' in error) {
          if (error.code === 'ERR_JWT_EXPIRED') {
            throw new JwtTokenExpired(JwtTokenVerifier.name);
          }
        }

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
      } catch (error: unknown) {
        // 토큰 만료 예외 처리
        if (error && typeof error === 'object' && 'code' in error) {
          if (error.code === 'ERR_JWT_EXPIRED') {
            throw new JwtTokenExpired(JwtTokenVerifier.name);
          }
        }

        throw new InvalidRefreshTokenClaims(JwtTokenVerifier.name);
      }
    };
  }
}
