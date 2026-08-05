import { AuthSession, AuthSessionUuid } from '$modules/auth/domain';
import { UserUuid } from '$modules/user/domain';

import type { AuthSession as PrismaAuthSession } from '@packages/api-db';

export const AuthSessionPrismaMapper = {
  toAuthSessionDomain(record: PrismaAuthSession): AuthSession {
    return AuthSession.create(AuthSessionUuid.create(record.id), {
      userId: UserUuid.create(record.userId),
      tokenHash: record.tokenHash,
      userAgent: record.userAgent,
      ipAddress: record.ipAddress,
      expiresAt: record.expiresAt,
      revokedAt: record.revokedAt,
    });
  },
};
