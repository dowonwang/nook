import { PrismaRepository } from '$shared/database';

import { AuthSessionPrismaMapper } from '../mappers/session';

import type {
  AuthSessionEntity,
  AuthSessionCommandRepository,
} from '$modules/auth/domain';

export class PrismaAuthSessionCommandRepository
  extends PrismaRepository
  implements AuthSessionCommandRepository
{
  async save(session: AuthSessionEntity): Promise<void> {
    await this.client.authSession.create({
      data: session.toSnapshot(),
    });
  }

  async rotate(
    sessionId: string,
    newAuthSession: AuthSessionEntity,
  ): Promise<boolean> {
    return this.transaction(async () => {
      const revoked = await this.client.authSession.updateMany({
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

      await this.client.authSession.create({
        data: newAuthSession.toSnapshot(),
      });

      return true;
    });
  }

  async findById(sessionId: string): Promise<AuthSessionEntity | null> {
    const session = await this.client.authSession.findUnique({
      where: { id: sessionId },
    });

    return session
      ? AuthSessionPrismaMapper.toAuthSessionDomain(session)
      : null;
  }

  async revoke(sessionId: string): Promise<void> {
    // 이미 폐기된 세션이어도 실패하지 않도록 updateMany를 사용한다
    await this.client.authSession.updateMany({
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
