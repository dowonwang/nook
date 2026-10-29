import type { AuthSessionEntity } from '../entities/session';

export interface AuthSessionCommandRepository {
  save(session: AuthSessionEntity): Promise<void>;
  rotate(
    sessionId: string,
    newAuthSession: AuthSessionEntity,
  ): Promise<boolean>;
  findById(sessionId: string): Promise<AuthSessionEntity | null>;
  revoke(sessionId: string): Promise<void>;
}
