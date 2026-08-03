import { InvalidCredentials } from '$modules/auth/error';

import type {
  User,
  UserCommandRepository,
  UserEmail,
} from '$modules/user/domain';
import type { PasswordHasher } from '../ports/password-hasher.port';

interface Credential {
  email: UserEmail;
  password: string;
}

export class CredentialAuthenticator {
  constructor(
    private readonly userCommandRepository: UserCommandRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async authenticate(credential: Credential): Promise<User> {
    const user = await this.userCommandRepository.findByEmail(
      credential.email.getValue(),
    );

    if (!user) {
      throw new InvalidCredentials(CredentialAuthenticator.name);
    }

    const isMatched = await this.passwordHasher.compare(
      credential.password,
      user.password.getValue(),
    );
    if (!isMatched) {
      throw new InvalidCredentials(CredentialAuthenticator.name);
    }

    return user;
  }
}
