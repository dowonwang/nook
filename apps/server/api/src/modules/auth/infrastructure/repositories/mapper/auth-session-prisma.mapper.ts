import { AuthSession } from '$modules/auth/domain/entities/auth-session.entity';
import { AuthSessionUuid } from '$modules/auth/domain/value-objects/auth-session-uuid.vo';
import { UserUuid } from '$modules/user/domain/value-objects/uuid.vo';

import type { AuthSession as PrismaAuthSession } from '@packages/api-db';

export const AuthSessionPrismaMapper = {
  toAuthSessionDomain(record: PrismaAuthSession): AuthSession {
    return AuthSession.create(AuthSessionUuid.create(record.id), {
      userId: UserUuid.create(record.userId),
      tokenHash: record.tokenHash,
      userAgent: record.userAgent,
      ipAddress: record.ipAddress,
      expiresAt: record.expiresAt,
      revokeAt: record.revokeAt,
    });
  },
};
