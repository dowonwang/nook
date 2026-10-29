import { AuthInvalidCredentialsError } from '$modules/auth/error';

import type {
  UserEntity,
  UserCommandRepository,
  UserEmailVo,
} from '$modules/user/domain';
import type { PasswordHasherPort } from '../ports/password-hasher';

interface Credential {
  email: UserEmailVo;
  password: string;
}

export class CredentialAuthenticatorService {
  constructor(
    private readonly userCommandRepository: UserCommandRepository,
    private readonly passwordHasher: PasswordHasherPort,
  ) {}

  async authenticate(credential: Credential): Promise<UserEntity> {
    const user = await this.userCommandRepository.findByEmail(
      credential.email.getValue(),
    );

    if (!user) {
      throw new AuthInvalidCredentialsError(
        CredentialAuthenticatorService.name,
      );
    }

    const isMatched = await this.passwordHasher.compare(
      credential.password,
      user.password.getValue(),
    );
    if (!isMatched) {
      throw new AuthInvalidCredentialsError(
        CredentialAuthenticatorService.name,
      );
    }

    return user;
  }
}
