import {
  AccessTokenClaims,
  AuthSession,
  AuthSessionUuid,
  RefreshTokenClaims,
  type AuthSessionCommandRepository,
  type TokenHasher,
  type TokenIssuer,
  type TokenVerifier,
} from '$modules/auth/domain';
import {
  AuthSessionNotFound,
  RefreshTokenMalFormed,
} from '$modules/auth/error';
import { UserDtoMapper, type UserDetailDto } from '$modules/user/application';
import { UserNotFound } from '$modules/user/error';
import { createLogger } from '$shared/logger';

import type { UserCommandRepository } from '$modules/user/domain';
import type { RequestMetadata } from '$shared/http';

export class RefreshHandler {
  private readonly logger = createLogger(RefreshHandler.name);

  constructor(
    private readonly authSessionCommandRepository: AuthSessionCommandRepository,
    private readonly userCommandRepository: UserCommandRepository,
    private readonly accessTokenIssuer: TokenIssuer,
    private readonly refreshTokenIssuer: TokenIssuer,
    private readonly tokenVerifier: TokenVerifier,
    private readonly tokenHasher: TokenHasher,
  ) {}

  async excute(
    refreshToken: string,
    { ipAddress, userAgent }: RequestMetadata,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    user: UserDetailDto;
  }> {
    const refreshPayload =
      await this.tokenVerifier.verifyRefreshToken(refreshToken);
    const refreshJti = refreshPayload.getJti();

    if (!refreshJti) {
      throw new RefreshTokenMalFormed(RefreshHandler.name);
    }

    const session =
      await this.authSessionCommandRepository.findById(refreshJti);
    if (!session) {
      throw new AuthSessionNotFound(RefreshHandler.name);
    }

    const sessionUserId = session.userId;
    const user = await this.userCommandRepository.findById(
      sessionUserId.getValue(),
    );
    if (!user) {
      throw new UserNotFound(RefreshHandler.name);
    }

    const accessTokenClaims = AccessTokenClaims.create({
      sub: user.id.getValue(),
    });
    const { token: newAccessToken } =
      await this.accessTokenIssuer.issueToken(accessTokenClaims);

    const refreshTokenId = AuthSessionUuid.generate();
    const refreshTokenClaims = RefreshTokenClaims.create({
      sub: user.id.getValue(),
      jti: refreshTokenId.getValue(),
    });
    const { token: newRefreshToken, expiresAt } =
      await this.refreshTokenIssuer.issueToken(refreshTokenClaims);

    if (!expiresAt) {
      throw new RefreshTokenMalFormed(RefreshHandler.name);
    }

    const newAuthSession = AuthSession.create(refreshTokenId, {
      userId: user.id,
      tokenHash: this.tokenHasher.create(newRefreshToken),
      revokeAt: null,
      userAgent,
      ipAddress,
      expiresAt,
    });

    await this.authSessionCommandRepository.save(newAuthSession);

    this.logger.info(
      { details: user.id.getValue() },
      'Token refreshed successfully',
    );

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      user: UserDtoMapper.fromEntity(user),
    };
  }
}
