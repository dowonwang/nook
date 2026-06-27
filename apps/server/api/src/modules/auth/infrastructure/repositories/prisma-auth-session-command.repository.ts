import { AuthSessionPrismaMapper } from '$modules/auth/infrastructure/repositories/mapper/auth-session-prisma.mapper';

import type { AuthSession } from '$modules/auth/domain/entities/auth-session.entity';
import type { AuthSessionCommandRepository } from '$modules/auth/domain/repositories/auth-session-command.repository';
import type { PrismaClient } from '@packages/api-db';

export class PrismaAuthSessionCommandRepository implements AuthSessionCommandRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(session: AuthSession): Promise<void> {
    await this.prisma.authSession.create({
      data: {
        id: session.id.getValue(),
        userId: session.userId.getValue(),

        tokenHash: session.tokenHash,
        ipAddress: session.ipAddress,
        userAgent: session.userAgent,

        expiresAt: session.expiresAt,
        revokeAt: session.revokeAt,
      },
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
}
