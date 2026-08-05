import type { AuthSession } from '../entities/auth-session.entity';

export interface AuthSessionCommandRepository {
  save(session: AuthSession): Promise<void>;
  rotate(sessionId: string, newAuthSession: AuthSession): Promise<boolean>;
  findById(sessionId: string): Promise<AuthSession | null>;
  revoke(sessionId: string): Promise<void>;
}
