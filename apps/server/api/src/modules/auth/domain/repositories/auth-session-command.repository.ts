import type { AuthSession } from '$modules/auth/domain/entities/auth-session.entity';

export interface AuthSessionCommandRepository {
  save(session: AuthSession): Promise<void>;
}
