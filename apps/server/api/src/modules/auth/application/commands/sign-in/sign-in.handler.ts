import { AccessTokenClaims } from '$modules/auth/domain/value-objects/access-token-claims.vo';
import { UserDtoMapper } from '$modules/user/application/mapper/user-dto.mapper';
import { UserEmail } from '$modules/user/domain/value-objects/email.vo';
import { InvaildCredentials } from '$modules/user/error/invaild-credentials.error';

import type { PasswordHaser } from '$modules/auth/domain/services/password-hasher';
import type { TokenIssuer } from '$modules/auth/domain/services/token-issuer';
import type { UserDetailDto } from '$modules/user/application/dto/user-detail.dto';
import type { UserCommandRepository } from '$modules/user/domain/repositories/user-command.repository';
import type { SignInCommand } from './sign-in.command';

export class SignInHandler {
  constructor(
    private readonly userCommandRepository: UserCommandRepository,
    private readonly passwordHasher: PasswordHaser,
    private readonly tokenIssuer: TokenIssuer,
  ) {}

  async excute(command: SignInCommand): Promise<{
    accessToken: string;
    user: UserDetailDto;
  }> {
    const email = UserEmail.create(command.email);
    const user = await this.userCommandRepository.findByEmail(email.getValue());

    if (!user) {
      throw new InvaildCredentials(SignInHandler.name);
    }

    const isMatched = await this.passwordHasher.compare(
      command.password,
      user.password.getValue(),
    );

    if (!isMatched) {
      throw new InvaildCredentials(SignInHandler.name);
    }

    const claims = AccessTokenClaims.create({
      sub: user.id.getValue(),
    });

    const accessToken = await this.tokenIssuer.issueAccessToken(claims);

    return {
      accessToken,
      user: UserDtoMapper.fromEntity(user),
    };
  }
}
