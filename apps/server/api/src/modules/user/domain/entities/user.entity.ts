import { Entity } from '$shared/ddd';

import type {
  UserEmail,
  UserName,
  UserPassword,
  UserUuid,
} from '../value-objects';

interface UserProps {
  email: UserEmail;
  password: UserPassword;
  name: UserName;
}

interface UserSnapshot {
  id: string;
  email: string;
  password: string;
  name: string;
}

export class User extends Entity<UserUuid> {
  private props: UserProps;

  private constructor(uuid: UserUuid, props: UserProps) {
    super(uuid);
    this.props = { ...props };
  }

  static create(uuid: UserUuid, props: UserProps): User {
    return new User(uuid, props);
  }

  toSnapshot(): Readonly<UserSnapshot> {
    return Object.freeze({
      id: this.id.getValue(),
      email: this.props.email.getValue(),
      password: this.props.password.getValue(),
      name: this.props.name.getValue(),
    });
  }

  get password(): UserPassword {
    return this.props.password;
  }
}
