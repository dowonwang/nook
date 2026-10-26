import { jwtVerify } from 'jose';

import {
  AccessTokenClaimsVo,
  RefreshTokenClaimsVo,
} from '$modules/auth/domain';
import {
  AuthInvalidAccessTokenClaimsError,
  AuthInvalidRefreshTokenClaimsError,
  AuthJwtTokenExpiredError,
  AuthMissingJwtSecretError,
  AuthRefreshTokenExpiredError,
} from '$modules/auth/error';

import type { TokenVerifierPort } from '$modules/auth/application';
import type {
  AccessTokenPayload,
  RefreshTokenPayload,
} from '$modules/auth/domain';

type Secret = string | null | undefined;

export class JwtTokenVerifierAdapter implements TokenVerifierPort {
  public readonly verifyAccessToken: (
    token: string,
  ) => Promise<AccessTokenClaimsVo>;
  public readonly verifyRefreshToken: (
    token: string,
  ) => Promise<RefreshTokenClaimsVo>;

  constructor(accessSecret: Secret, refreshSecret: Secret) {
    if (!accessSecret || !refreshSecret) {
      throw new AuthMissingJwtSecretError(JwtTokenVerifierAdapter.name);
    }

    const accessSecretBuffer = new TextEncoder().encode(accessSecret);
    const refreshSecretBuffer = new TextEncoder().encode(refreshSecret);

    this.verifyAccessToken = async (token: string) => {
      try {
        const { payload } = await jwtVerify(token, accessSecretBuffer, {
          algorithms: ['HS256'],
        });

        const claims = AccessTokenClaimsVo.create(
          payload as AccessTokenPayload,
        );

        return claims;
      } catch (error: unknown) {
        // 토큰 만료 예외 처리
        if (error && typeof error === 'object' && 'code' in error) {
          if (error.code === 'ERR_JWT_EXPIRED') {
            throw new AuthJwtTokenExpiredError(JwtTokenVerifierAdapter.name);
          }
        }

        throw new AuthInvalidAccessTokenClaimsError(
          JwtTokenVerifierAdapter.name,
        );
      }
    };

    this.verifyRefreshToken = async (token: string) => {
      try {
        const { payload } = await jwtVerify(token, refreshSecretBuffer, {
          algorithms: ['HS256'],
        });

        const claims = RefreshTokenClaimsVo.create(
          payload as RefreshTokenPayload,
        );

        return claims;
      } catch (error: unknown) {
        // 토큰 만료 예외 처리
        if (error && typeof error === 'object' && 'code' in error) {
          if (error.code === 'ERR_JWT_EXPIRED') {
            throw new AuthRefreshTokenExpiredError(
              JwtTokenVerifierAdapter.name,
            );
          }
        }

        throw new AuthInvalidRefreshTokenClaimsError(
          JwtTokenVerifierAdapter.name,
        );
      }
    };
  }
}
