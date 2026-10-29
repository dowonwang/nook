import { AuthRefreshTokenMalformedError } from '$modules/auth/error';
import { createLogger } from '$shared/logger';

import type { AuthSessionCommandRepository } from '$modules/auth/domain';
import type { TokenVerifierPort } from '../../ports/token-verifier';

export class SignOutHandler {
  private readonly logger = createLogger(SignOutHandler.name);

  constructor(
    private readonly authSessionCommandRepository: AuthSessionCommandRepository,
    private readonly tokenVerifier: TokenVerifierPort,
  ) {}

  async execute(refreshToken: string): Promise<void> {
    const refreshPayload =
      await this.tokenVerifier.verifyRefreshToken(refreshToken);
    const refreshJti = refreshPayload.getJti();

    if (!refreshJti) {
      throw new AuthRefreshTokenMalformedError(SignOutHandler.name);
    }

    await this.authSessionCommandRepository.revoke(refreshJti);

    this.logger.info(
      {
        details: refreshJti,
      },
      'User signed out successfully',
    );
  }
}
