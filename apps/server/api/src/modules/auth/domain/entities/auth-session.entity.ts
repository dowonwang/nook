import { Entity } from '$shared/ddd/entity/entity.abstract';

import type { AuthSessionUuid } from '$modules/auth/domain/value-objects/auth-session-uuid.vo';
import type { UserUuid } from '$modules/user/domain/value-objects/uuid.vo';

interface AuthSessionProps {
  userId: UserUuid;
  tokenHash: string;
  userAgent: string;
  ipAddress: string;
  expiresAt: Date;
  revokeAt?: Date;
}

export class AuthSession extends Entity<AuthSessionUuid> {
  private props: AuthSessionProps;

  private constructor(id: AuthSessionUuid, props: AuthSessionProps) {
    super(id);
    this.props = { ...props };
  }

  static create(id: AuthSessionUuid, props: AuthSessionProps) {
    return new AuthSession(id, props);
  }

  get userId() {
    return this.props.userId;
  }

  get tokenHash() {
    return this.props.tokenHash;
  }

  get userAgent() {
    return this.props.userAgent;
  }

  get ipAddress() {
    return this.props.ipAddress;
  }

  get expiresAt() {
    return this.props.expiresAt;
  }

  get revokeAt() {
    return this.props.revokeAt;
  }
}
