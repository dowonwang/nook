import { Entity } from '$shared/ddd';

import type {
  UserEmail,
  UserName,
  UserPassword,
  UserUuid,
} from '../value-objects';

export interface UserProps {
  email: UserEmail;
  password: UserPassword;
  name: UserName;

  createdAt?: Date;
  updatedAt?: Date;
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

  changeName(name: UserName) {
    this.props.name = name;
  }

  changePassword(password: UserPassword) {
    this.props.password = password;
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get name(): UserName {
    return this.props.name;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }
}
