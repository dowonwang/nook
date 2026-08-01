import { RefreshTokenMalFormed } from '$modules/auth/error';

import type { AuthSession } from '$modules/auth/domain';
import type { TokenHasher } from '../ports/token-hasher.port';

export class RefershTokenValidator {
  constructor(private readonly tokenHasher: TokenHasher) {}

  assertMatchesSession(refreshToken: string, session: AuthSession): void {
    if (!this.tokenHasher.compare(refreshToken, session.tokenHash)) {
      throw new RefreshTokenMalFormed(RefershTokenValidator.name);
    }
  }
}
