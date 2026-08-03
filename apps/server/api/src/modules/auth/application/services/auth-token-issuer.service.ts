import {
  AccessTokenClaims,
  AuthSession,
  AuthSessionUuid,
  RefreshTokenClaims,
} from '$modules/auth/domain';
import { RefreshTokenMalformed } from '$modules/auth/error';

import type { User } from '$modules/user/domain';
import type { RequestMetadata } from '$shared/http';
import type { TokenHasher } from '../ports/token-hasher.port';
import type { TokenIssuer } from '../ports/token-issuer.port';

interface TokenRotationResult {
  accessToken: string;
  refreshToken: string;
  authSession: AuthSession;
}

export class AuthTokenIssuer {
  constructor(
    private readonly accessTokenIssuer: TokenIssuer,
    private readonly refreshTokenIssuer: TokenIssuer,
    private readonly tokenHasher: TokenHasher,
  ) {}

  async issue(
    user: User,
    metadata: RequestMetadata,
  ): Promise<TokenRotationResult> {
    // access token 발급
    const accessTokenCliams = AccessTokenClaims.create({
      sub: user.id.getValue(),
    });
    const { token: accessToken } =
      await this.accessTokenIssuer.issueToken(accessTokenCliams);

    // refresh token 발급
    const refreshTokenId = AuthSessionUuid.generate();
    const refreshTokenClaims = RefreshTokenClaims.create({
      sub: user.id.getValue(),
      jti: refreshTokenId.getValue(),
    });
    const { token: refreshToken, expiresAt } =
      await this.refreshTokenIssuer.issueToken(refreshTokenClaims);

    if (!expiresAt) {
      throw new RefreshTokenMalformed(AuthTokenIssuer.name);
    }

    const authSession = AuthSession.create(refreshTokenId, {
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
