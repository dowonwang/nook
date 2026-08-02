import {
  User,
  UserEmail,
  UserName,
  UserPassword,
  UserUuid,
  type UserCommandRepository,
} from '$modules/user/domain';
import { EmailAlreadyExists } from '$modules/user/error';
import { createLogger } from '$shared/logger';

import type { SignUpCommand } from './sign-up.command';
import type { PasswordHasher } from '../../ports/password-hasher.port';

export class SignUpHandler {
  private readonly logger = createLogger(SignUpHandler.name);

  constructor(
    private readonly userCommandRepository: UserCommandRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(command: SignUpCommand): Promise<{ id: string }> {
    const email = UserEmail.create(command.email);

    const existing = await this.userCommandRepository.findByEmail(
      email.getValue(),
    );

    if (existing) {
      throw new EmailAlreadyExists(SignUpHandler.name, existing.id);
    }

    const hashedPassword = await this.passwordHasher.hash(command.password);
    const name = UserName.create(command.name);

    const user = User.create(UserUuid.generate(), {
      email,
      name,
      password: UserPassword.fromHashed(hashedPassword),
    });

    await this.userCommandRepository.save(user);

    this.logger.info(
      {
        details: user.id.getValue(),
      },
      'User signed up successfully',
    );

    return { id: user.id.getValue() };
  }
}
