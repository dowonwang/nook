import { AuthSessionEntity, AuthSessionUuidVo } from '$modules/auth/domain';
import { UserUuidVo } from '$modules/user/domain';

import type { AuthSession as PrismaAuthSession } from '@packages/api-db';

export const AuthSessionPrismaMapper = {
  toAuthSessionDomain(record: PrismaAuthSession): AuthSessionEntity {
    return AuthSessionEntity.create(AuthSessionUuidVo.create(record.id), {
      userId: UserUuidVo.create(record.userId),
      tokenHash: record.tokenHash,
      userAgent: record.userAgent,
      ipAddress: record.ipAddress,
      expiresAt: record.expiresAt,
      revokedAt: record.revokedAt,
    });
  },
};
