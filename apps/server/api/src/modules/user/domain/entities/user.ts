import { Entity } from '$shared/ddd';

import type {
  UserEmailVo,
  UserNameVo,
  UserPasswordVo,
  UserUuidVo,
} from '../value-objects';

interface Props {
  email: UserEmailVo;
  password: UserPasswordVo;
  name: UserNameVo;
}

interface Snapshot {
  id: string;
  email: string;
  password: string;
  name: string;
}

export class UserEntity extends Entity<UserUuidVo, Snapshot> {
  private props: Props;

  private constructor(uuid: UserUuidVo, props: Props) {
    super(uuid);
    this.props = { ...props };
  }

  static create(uuid: UserUuidVo, props: Props): UserEntity {
    return new UserEntity(uuid, props);
  }

  toSnapshot(): Readonly<Snapshot> {
    return Object.freeze({
      id: this.id.getValue(),
      email: this.props.email.getValue(),
      password: this.props.password.getValue(),
      name: this.props.name.getValue(),
    });
  }

  get email(): UserEmailVo {
    return this.props.email;
  }

  get password(): UserPasswordVo {
    return this.props.password;
  }
}
