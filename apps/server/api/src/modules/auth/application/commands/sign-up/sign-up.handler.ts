import { User } from '$modules/user/domain/entities/user.entity';
import { UserEmail } from '$modules/user/domain/value-objects/email.vo';
import { UserName } from '$modules/user/domain/value-objects/name.vo';
import { UserPassword } from '$modules/user/domain/value-objects/password.vo';
import { UserUuid } from '$modules/user/domain/value-objects/uuid.vo';
import { EmailAlreadyExists } from '$modules/user/error/email-already-exists.error';
import { createLogger } from '$shared/logger';

import type { PasswordHaser } from '$modules/auth/domain/services/password-hasher';
import type { UserCommandRepository } from '$modules/user/domain/repositories/user-command.repository';
import type { SignUpCommand } from './sign-up.command';

export class SignUpHandler {
  constructor(
    private readonly userCommandRepository: UserCommandRepository,
    private readonly passwordHasher: PasswordHaser,
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

    logger.info(
      {
        details: user.id.getValue(),
      },
      'User signed up successfully',
    );

    return { id: user.id.getValue() };
  }
}

const logger = createLogger(SignUpHandler.name);
