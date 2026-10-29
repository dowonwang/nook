import { Entity } from '$shared/ddd';

import type { UserUuidVo } from '$modules/user/domain';
import type { AuthSessionUuidVo } from '../value-objects/session-uuid';

interface Attributes {
  tokenHash: string;
  userAgent: string;
  ipAddress: string;
  expiresAt: Date;
  revokedAt: Date | null;
}

interface Props extends Attributes {
  userId: UserUuidVo;
}

interface Snapshot extends Attributes {
  id: string;
  userId: string;
}

export class AuthSessionEntity extends Entity<AuthSessionUuidVo, Snapshot> {
  private readonly props: Props;

  private constructor(id: AuthSessionUuidVo, props: Props) {
    super(id);
    this.props = {
      ...props,
      expiresAt: new Date(props.expiresAt),
      revokedAt: props.revokedAt ? new Date(props.revokedAt) : null,
    };
  }

  static create(id: AuthSessionUuidVo, props: Props): AuthSessionEntity {
    return new AuthSessionEntity(id, props);
  }

  toSnapshot(): Readonly<Snapshot> {
    return Object.freeze({
      id: this.id.getValue(),
      userId: this.props.userId.getValue(),
      tokenHash: this.props.tokenHash,
      userAgent: this.props.userAgent,
      ipAddress: this.props.ipAddress,
      expiresAt: new Date(this.props.expiresAt),
      revokedAt: this.props.revokedAt ? new Date(this.props.revokedAt) : null,
    });
  }

  isExpired(now = new Date()): boolean {
    return this.props.expiresAt.getTime() <= now.getTime();
  }

  isRevoked(): boolean {
    return this.props.revokedAt !== null;
  }

  get userId(): UserUuidVo {
    return this.props.userId;
  }

  get tokenHash(): string {
    return this.props.tokenHash;
  }
}
