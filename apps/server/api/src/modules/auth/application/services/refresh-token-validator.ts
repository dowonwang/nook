import { AuthRefreshTokenMalformedError } from '$modules/auth/error';

import type { AuthSessionEntity } from '$modules/auth/domain';
import type { TokenHasherPort } from '../ports/token-hasher';

export class RefreshTokenValidatorService {
  constructor(private readonly tokenHasher: TokenHasherPort) {}

  assertMatchesSession(refreshToken: string, session: AuthSessionEntity): void {
    if (!this.tokenHasher.compare(refreshToken, session.tokenHash)) {
      throw new AuthRefreshTokenMalformedError(
        RefreshTokenValidatorService.name,
      );
    }
  }
}
