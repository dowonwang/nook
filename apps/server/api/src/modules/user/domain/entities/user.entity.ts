import { Entity } from '$shared/ddd';

import type {
  UserEmail,
  UserName,
  UserPassword,
  UserUuid,
} from '../value-objects';

interface Props {
  email: UserEmail;
  password: UserPassword;
  name: UserName;
}

interface Snapshot {
  id: string;
  email: string;
  password: string;
  name: string;
}

export class User extends Entity<UserUuid, Snapshot> {
  private props: Props;

  private constructor(uuid: UserUuid, props: Props) {
    super(uuid);
    this.props = { ...props };
  }

  static create(uuid: UserUuid, props: Props): User {
    return new User(uuid, props);
  }

  toSnapshot(): Readonly<Snapshot> {
    return Object.freeze({
      id: this.id.getValue(),
      email: this.props.email.getValue(),
      password: this.props.password.getValue(),
      name: this.props.name.getValue(),
    });
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get password(): UserPassword {
    return this.props.password;
  }
}
