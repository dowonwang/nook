import { AuthSessionPrismaMapper } from './mapper/auth-session-prisma.mapper';

import type {
  AuthSession,
  AuthSessionCommandRepository,
} from '$modules/auth/domain';
import type { PrismaClient } from '@packages/api-db';

export class PrismaAuthSessionCommandRepository implements AuthSessionCommandRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(session: AuthSession): Promise<void> {
    await this.prisma.authSession.create({
      data: session.toSnapshot(),
    });
  }

  async rotate(
    sessionId: string,
    newAuthSession: AuthSession,
  ): Promise<boolean> {
    return this.prisma.$transaction(async (tx) => {
      const revoked = await tx.authSession.updateMany({
        where: {
          id: sessionId,
          revokedAt: null,
        },
        data: {
          revokedAt: new Date(),
        },
      });

      if (revoked.count === 0) {
        return false;
      }

      await tx.authSession.create({
        data: newAuthSession.toSnapshot(),
      });

      return true;
    });
  }

  async findById(sessionId: string): Promise<AuthSession | null> {
    const session = await this.prisma.authSession.findUnique({
      where: { id: sessionId },
    });

    return session
      ? AuthSessionPrismaMapper.toAuthSessionDomain(session)
      : null;
  }

  async revoke(sessionId: string): Promise<void> {
    await this.prisma.authSession.update({
      where: {
        id: sessionId,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });
  }
}
