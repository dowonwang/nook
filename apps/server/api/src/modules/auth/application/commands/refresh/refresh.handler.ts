import {
  RefreshSessionPolicy,
  type AuthSessionCommandRepository,
} from '$modules/auth/domain';
import {
  AuthSessionNotFound,
  RefreshTokenMalformed,
  RefreshTokenRevoked,
} from '$modules/auth/error';
import { UserDtoMapper } from '$modules/user/application';
import { UserNotFound } from '$modules/user/error';
import { createLogger } from '$shared/logger';

import type { UserCommandRepository } from '$modules/user/domain';
import type { RequestMetadata } from '$shared/http';
import type { RefreshResult } from './refresh.command';
import type { TokenVerifier } from '../../ports/token-verifier.port';
import type { RefreshTokenValidator } from '../../services/refresh-token-validator.service';
import type { TokenRotationService } from '../../services/token-rotation.service';

export class RefreshHandler {
  private readonly logger = createLogger(RefreshHandler.name);

  constructor(
    private readonly authSessionCommandRepository: AuthSessionCommandRepository,
    private readonly userCommandRepository: UserCommandRepository,
    private readonly refreshTokenValidator: RefreshTokenValidator,
    private readonly tokenRotation: TokenRotationService,
    private readonly tokenVerifier: TokenVerifier,
  ) {}

  async execute(
    refreshToken: string,
    requestMetaData: RequestMetadata,
  ): Promise<RefreshResult> {
    const refreshPayload =
      await this.tokenVerifier.verifyRefreshToken(refreshToken);

    const refreshJti = refreshPayload.getJti();
    const refreshSub = refreshPayload.getSubject();

    if (!refreshJti || !refreshSub) {
      throw new RefreshTokenMalformed(RefreshHandler.name);
    }

    const session =
      await this.authSessionCommandRepository.findById(refreshJti);
    if (!session) {
      throw new AuthSessionNotFound(RefreshHandler.name);
    }

    RefreshSessionPolicy.assertRefreshable(session);
    this.refreshTokenValidator.assertMatchesSession(refreshToken, session);

    const user = await this.userCommandRepository.findById(
      session.userId.getValue(),
    );
    if (!user) {
      throw new UserNotFound(RefreshHandler.name);
    }
    RefreshSessionPolicy.assertSubjectMatchesUser(
      refreshSub,
      user.id.getValue(),
    );

    const { authSession, ...rotatedToken } = await this.tokenRotation.rotate(
      user,
      requestMetaData,
    );

    const rotated = await this.authSessionCommandRepository.rotate(
      session.id.getValue(),
      authSession,
    );

    if (!rotated) {
      throw new RefreshTokenRevoked(RefreshHandler.name);
    }

    this.logger.info(
      { details: user.id.getValue() },
      'Token refreshed successfully',
    );

    return {
      accessToken: rotatedToken.accessToken,
      refreshToken: rotatedToken.refreshToken,
      user: UserDtoMapper.fromEntity(user),
    };
  }
}
