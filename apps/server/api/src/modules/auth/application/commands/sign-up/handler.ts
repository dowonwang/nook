import { AuthEmailAlreadyExistsError } from '$modules/auth/error';
import {
  UserEntity,
  UserNameVo,
  UserPasswordVo,
  UserUuidVo,
  type UserCommandRepository,
} from '$modules/user/domain';
import { createLogger } from '$shared/logger';

import { SignUpCommand } from './command';

import type { SignUpInput } from './command';
import type { PasswordHasherPort } from '../../ports/password-hasher';

export class SignUpHandler {
  private readonly logger = createLogger(SignUpHandler.name);

  constructor(
    private readonly userCommandRepository: UserCommandRepository,
    private readonly passwordHasher: PasswordHasherPort,
  ) {}

  async execute(input: SignUpInput): Promise<{ id: string }> {
    const command = new SignUpCommand(input);
    const email = command.email;

    const existing = await this.userCommandRepository.findByEmail(
      email.getValue(),
    );

    if (existing) {
      throw new AuthEmailAlreadyExistsError(SignUpHandler.name, existing.id);
    }

    const hashedPassword = await this.passwordHasher.hash(command.password);
    const name = UserNameVo.create(command.name);

    const user = UserEntity.create(UserUuidVo.generate(), {
      email,
      name,
      password: UserPasswordVo.fromHashed(hashedPassword),
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
