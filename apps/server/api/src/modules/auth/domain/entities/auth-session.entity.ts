import { Entity } from '$shared/ddd';

import type { UserUuid } from '$modules/user/domain';
import type { AuthSessionUuid } from '../value-objects/auth-session-uuid.vo';

interface AuthSessionAttributes {
  tokenHash: string;
  userAgent: string;
  ipAddress: string;
  expiresAt: Date;
  revokedAt: Date | null;
}

interface AuthSessionProps extends AuthSessionAttributes {
  userId: UserUuid;
}

interface AuthSessionSnapshot extends AuthSessionAttributes {
  id: string;
  userId: string;
}

export class AuthSession extends Entity<AuthSessionUuid> {
  private readonly props: AuthSessionProps;

  private constructor(id: AuthSessionUuid, props: AuthSessionProps) {
    super(id);
    this.props = {
      ...props,
      expiresAt: new Date(props.expiresAt),
      revokedAt: props.revokedAt ? new Date(props.revokedAt) : null,
    };
  }

  static create(id: AuthSessionUuid, props: AuthSessionProps): AuthSession {
    return new AuthSession(id, props);
  }

  isExpired(now = new Date()): boolean {
    return this.props.expiresAt.getTime() <= now.getTime();
  }

  isRevoked(): boolean {
    return this.props.revokedAt !== null;
  }

  toSnapshot(): AuthSessionSnapshot {
    return {
      id: this.id.getValue(),
      userId: this.props.userId.getValue(),
      tokenHash: this.props.tokenHash,
      userAgent: this.props.userAgent,
      ipAddress: this.props.ipAddress,
      expiresAt: new Date(this.props.expiresAt),
      revokedAt: this.props.revokedAt ? new Date(this.props.revokedAt) : null,
    };
  }

  get userId(): UserUuid {
    return this.props.userId;
  }

  get tokenHash(): string {
    return this.props.tokenHash;
  }
}
