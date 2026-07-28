import { RefreshTokenMalFormed } from '$modules/auth/error';
import { createLogger } from '$shared/logger';

import type {
  AuthSessionCommandRepository,
  TokenVerifier,
} from '$modules/auth/domain';

export class SignOutHandler {
  private readonly logger = createLogger(SignOutHandler.name);

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

    this.logger.info(
      {
        details: refreshJti,
      },
      'User signed out successfully',
    );
  }
}
