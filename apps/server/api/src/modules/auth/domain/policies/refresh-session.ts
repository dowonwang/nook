import {
  AuthRefreshTokenExpiredError,
  AuthRefreshTokenMalformedError,
  AuthRefreshTokenRevokedError,
} from '$modules/auth/error';

import type { AuthSessionEntity } from '../entities/session';

const SCOPE = 'RefreshSessionPolicy' as const;

export const RefreshSessionPolicy = {
  assertRefreshable(session: AuthSessionEntity): void {
    if (session.isExpired()) {
      throw new AuthRefreshTokenExpiredError(SCOPE);
    }

    if (session.isRevoked()) {
      throw new AuthRefreshTokenRevokedError(SCOPE);
    }
  },

  assertSubjectMatchesUser(tokenSubject: string, userId: string): void {
    if (tokenSubject !== userId) {
      throw new AuthRefreshTokenMalformedError(SCOPE);
    }
  },
} as const;
