import { RefreshTokenMalFormed } from '$modules/auth/error/refresh-token-malformed.error';
import { createLogger } from '$shared/logger';

import type { AuthSessionCommandRepository } from '$modules/auth/domain/repositories/auth-session-command.repository';
import type { TokenVerifier } from '$modules/auth/domain/services/token-verifier';

export class SignOutHandler {
  constructor(
    private readonly authSessionCommandRepository: AuthSessionCommandRepository,
    private readonly tokenVerifier: TokenVerifier,
  ) {}

  async execute(refreshToken: string): Promise<void> {
    const refreshPayload =
      await this.tokenVerifier.verifyRefreshToken(refreshToken);
    const refreshJti = refreshPayload.getJti();

    if (!refreshJti) {
      throw new RefreshTokenMalFormed(SignOutHandler.name);
    }

    await this.authSessionCommandRepository.revoke(refreshJti);

    logger.info(
      {
        details: refreshJti,
      },
      'User signed out successfully',
    );
  }
}

const logger = createLogger(SignOutHandler.name);
