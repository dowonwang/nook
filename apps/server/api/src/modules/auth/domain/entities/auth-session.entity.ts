import { Entity } from '$shared/ddd';

import type { UserUuid } from '$modules/user/domain';
import type { AuthSessionUuid } from '../value-objects/auth-session-uuid.vo';

interface AuthSessionProps {
  userId: UserUuid;
  tokenHash: string;
  userAgent: string;
  ipAddress: string;
  expiresAt: Date;
  revokeAt: Date | null;
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
