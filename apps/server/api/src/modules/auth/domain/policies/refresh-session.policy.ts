import {
  RefreshTokenExpired,
  RefreshTokenMalFormed,
  RefreshTokenRevoked,
} from '$modules/auth/error';

import type { AuthSession } from '../entities/auth-session.entity';

const SCOPE = 'RefreshSessionPolicy' as const;

export const RefreshSessionPolicy = {
  assertRefreshable(session: AuthSession): void {
    if (session.isExpired()) {
      throw new RefreshTokenExpired(SCOPE);
    }

    if (session.isRevoked()) {
      throw new RefreshTokenRevoked(SCOPE);
    }
  },

  assertSubjectMatchesUser(tokenSubject: string, userId: string): void {
    if (tokenSubject !== userId) {
      throw new RefreshTokenMalFormed(SCOPE);
    }
  },
} as const;
