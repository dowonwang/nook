import { AuthSession } from '$modules/auth/domain/entities/auth-session.entity';
import { AccessTokenClaims } from '$modules/auth/domain/value-objects/access-token-claims.vo';
import { AuthSessionUuid } from '$modules/auth/domain/value-objects/auth-session-uuid.vo';
import { RefreshTokenClaims } from '$modules/auth/domain/value-objects/refresh-token-claims.vo';
import { UserDtoMapper } from '$modules/user/application/mapper/user-dto.mapper';
import { UserEmail } from '$modules/user/domain/value-objects/email.vo';
import { InvaildCredentials } from '$modules/user/error/invaild-credentials.error';

import type { AuthSessionCommandRepository } from '$modules/auth/domain/repositories/auth-session-command.repository';
import type { PasswordHaser } from '$modules/auth/domain/services/password-hasher';
import type { TokenHasher } from '$modules/auth/domain/services/token-hasher';
import type { TokenIssuer } from '$modules/auth/domain/services/token-issuer';
import type { UserDetailDto } from '$modules/user/application/dto/user-detail.dto';
import type { UserCommandRepository } from '$modules/user/domain/repositories/user-command.repository';
import type { SignInCommand } from './sign-in.command';

export class SignInHandler {
  constructor(
    private readonly userCommandRepository: UserCommandRepository,
    private readonly authSessionCommandRepository: AuthSessionCommandRepository,
    private readonly passwordHasher: PasswordHaser,
    private readonly accessTokenIssuer: TokenIssuer,
    private readonly refreshTokenIssuer: TokenIssuer,
    private readonly tokenHasher: TokenHasher,
  ) {}

  async excute(command: SignInCommand): Promise<{
    accessToken: string;
    refreshToken: string;
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

    const acessTokenClaims = AccessTokenClaims.create({
      sub: user.id.getValue(),
    });
    const accessToken =
      await this.accessTokenIssuer.issueToken(acessTokenClaims);

    const refreshTokenId = AuthSessionUuid.generate();
    const refreshTokenClaims = RefreshTokenClaims.create({
      sub: user.id.getValue(),
      jti: refreshTokenId.getValue(),
    });
    const refreshToken =
      await this.refreshTokenIssuer.issueToken(refreshTokenClaims);

    const authSession = AuthSession.create(refreshTokenId, {
      userId: user.id,
      tokenHash: this.tokenHasher.create(refreshToken),
      userAgent: 'userAgent',
      expiresAt: new Date(),
      ipAddress: 'ipAddress',
      revokeAt: null,
    });

    await this.authSessionCommandRepository.save(authSession);

    return {
      accessToken,
      refreshToken,
      user: UserDtoMapper.fromEntity(user),
    };
  }
}
