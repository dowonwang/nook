import { AuthSession } from '$modules/auth/domain/entities/auth-session.entity';
import { AccessTokenClaims } from '$modules/auth/domain/value-objects/access-token-claims.vo';
import { AuthSessionUuid } from '$modules/auth/domain/value-objects/auth-session-uuid.vo';
import { RefreshTokenClaims } from '$modules/auth/domain/value-objects/refresh-token-claims.vo';
import { AuthSessionNotFound } from '$modules/auth/error/auth-session-not-found.error';
import { RefreshTokenMalFormed } from '$modules/auth/error/refresh-token-malformed.error';
import { UserDtoMapper } from '$modules/user/application/mapper/user-dto.mapper';
import { UserNotFound } from '$modules/user/error/user-not-found.error';

import type { AuthSessionCommandRepository } from '$modules/auth/domain/repositories/auth-session-command.repository';
import type { TokenHasher } from '$modules/auth/domain/services/token-hasher';
import type { TokenIssuer } from '$modules/auth/domain/services/token-issuer';
import type { TokenVerifier } from '$modules/auth/domain/services/token-verifier';
import type { UserDetailDto } from '$modules/user/application/dto/user-detail.dto';
import type { UserCommandRepository } from '$modules/user/domain/repositories/user-command.repository';
import type { RequestMetadata } from '$shared/http/lib/get-request-metadata';

export class RefreshHandler {
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
    const newAccessToken =
      await this.accessTokenIssuer.issueToken(accessTokenClaims);

    const refreshTokenId = AuthSessionUuid.generate();
    const refreshTokenClaims = RefreshTokenClaims.create({
      sub: user.id.getValue(),
      jti: refreshTokenId.getValue(),
    });
    const newRefreshToken =
      await this.refreshTokenIssuer.issueToken(refreshTokenClaims);

    const newAuthSession = AuthSession.create(refreshTokenId, {
      userId: user.id,
      tokenHash: this.tokenHasher.create(newRefreshToken),
      expiresAt: new Date(),
      revokeAt: null,
      userAgent,
      ipAddress,
    });

    await this.authSessionCommandRepository.save(newAuthSession);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      user: UserDtoMapper.fromEntity(user),
    };
  }
}
