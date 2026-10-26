import {
  AccessTokenClaimsVo,
  AuthSessionEntity,
  AuthSessionUuidVo,
  RefreshTokenClaimsVo,
} from '$modules/auth/domain';
import { AuthRefreshTokenMalformedError } from '$modules/auth/error';

import type { UserEntity } from '$modules/user/domain';
import type { RequestMetadata } from '$shared/http';
import type { TokenHasherPort } from '../ports/token-hasher';
import type { TokenIssuerPort } from '../ports/token-issuer';

interface TokenRotationResult {
  accessToken: string;
  refreshToken: string;
  authSession: AuthSessionEntity;
}

export class AuthTokenIssuerService {
  constructor(
    private readonly accessTokenIssuer: TokenIssuerPort,
    private readonly refreshTokenIssuer: TokenIssuerPort,
    private readonly tokenHasher: TokenHasherPort,
  ) {}

  async issue(
    user: UserEntity,
    metadata: RequestMetadata,
  ): Promise<TokenRotationResult> {
    // access token 발급
    const accessTokenClaims = AccessTokenClaimsVo.create({
      sub: user.id.getValue(),
    });
    const { token: accessToken } =
      await this.accessTokenIssuer.issueToken(accessTokenClaims);

    // refresh token 발급
    const refreshTokenId = AuthSessionUuidVo.generate();
    const refreshTokenClaims = RefreshTokenClaimsVo.create({
      sub: user.id.getValue(),
      jti: refreshTokenId.getValue(),
    });
    const { token: refreshToken, expiresAt } =
      await this.refreshTokenIssuer.issueToken(refreshTokenClaims);

    if (!expiresAt) {
      throw new AuthRefreshTokenMalformedError(AuthTokenIssuerService.name);
    }

    const authSession = AuthSessionEntity.create(refreshTokenId, {
      userId: user.id,
      tokenHash: this.tokenHasher.create(refreshToken),
      revokedAt: null,
      userAgent: metadata.userAgent,
      ipAddress: metadata.ipAddress,
      expiresAt,
    });

    return {
      accessToken,
      refreshToken,
      authSession,
    };
  }
}
