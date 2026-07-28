import type { AuthSession } from '../entities/auth-session.entity';

export interface AuthSessionCommandRepository {
  save(session: AuthSession): Promise<void>;
  findById(sessionId: string): Promise<AuthSession | null>;
  revoke(sessionId: string): Promise<void>;
}
