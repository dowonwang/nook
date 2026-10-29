import {
  RefreshSessionPolicy,
  type AuthSessionCommandRepository,
} from '$modules/auth/domain';
import {
  AuthSessionNotFoundError,
  AuthRefreshTokenMalformedError,
  AuthRefreshTokenRevokedError,
} from '$modules/auth/error';
import { createLogger } from '$shared/logger';

import { AuthUserDtoMapper } from '../../mappers/user';

import type { UserCommandRepository } from '$modules/user/domain';
import type { RequestMetadata } from '$shared/http';
import type { RefreshResult } from './command';
import type { TokenVerifierPort } from '../../ports/token-verifier';
import type { RefreshTokenValidatorService } from '../../services/refresh-token-validator';
import type { AuthTokenIssuerService } from '../../services/token-issuer';

export class RefreshHandler {
  private readonly logger = createLogger(RefreshHandler.name);

  constructor(
    private readonly authSessionCommandRepository: AuthSessionCommandRepository,
    private readonly userCommandRepository: UserCommandRepository,
    private readonly refreshTokenValidator: RefreshTokenValidatorService,
    private readonly authTokenIssuer: AuthTokenIssuerService,
    private readonly tokenVerifier: TokenVerifierPort,
  ) {}

  async execute(
    refreshToken: string,
    requestMetadata: RequestMetadata,
  ): Promise<RefreshResult> {
    const refreshPayload =
      await this.tokenVerifier.verifyRefreshToken(refreshToken);

    const refreshJti = refreshPayload.getJti();
    const refreshSub = refreshPayload.getSubject();

    if (!refreshJti || !refreshSub) {
      throw new AuthRefreshTokenMalformedError(RefreshHandler.name);
    }

    const session =
      await this.authSessionCommandRepository.findById(refreshJti);
    if (!session) {
      throw new AuthSessionNotFoundError(RefreshHandler.name);
    }

    RefreshSessionPolicy.assertRefreshable(session);
    this.refreshTokenValidator.assertMatchesSession(refreshToken, session);

    const user = await this.userCommandRepository.findById(
      session.userId.getValue(),
    );
    if (!user) {
      throw new AuthSessionNotFoundError(RefreshHandler.name);
    }
    RefreshSessionPolicy.assertSubjectMatchesUser(
      refreshSub,
      user.id.getValue(),
    );

    const { authSession, ...authToken } = await this.authTokenIssuer.issue(
      user,
      requestMetadata,
    );

    const rotated = await this.authSessionCommandRepository.rotate(
      session.id.getValue(),
      authSession,
    );

    if (!rotated) {
      throw new AuthRefreshTokenRevokedError(RefreshHandler.name);
    }

    this.logger.info(
      { details: user.id.getValue() },
      'Token refreshed successfully',
    );

    return {
      accessToken: authToken.accessToken,
      refreshToken: authToken.refreshToken,
      user: AuthUserDtoMapper.fromEntity(user),
    };
  }
}
