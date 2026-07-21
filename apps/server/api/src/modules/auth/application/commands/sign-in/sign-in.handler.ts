import { AuthSession } from '$modules/auth/domain/entities/auth-session.entity';
import { AccessTokenClaims } from '$modules/auth/domain/value-objects/access-token-claims.vo';
import { AuthSessionUuid } from '$modules/auth/domain/value-objects/auth-session-uuid.vo';
import { RefreshTokenClaims } from '$modules/auth/domain/value-objects/refresh-token-claims.vo';
import { RefreshTokenMalFormed } from '$modules/auth/error/refresh-token-malformed.error';
import { UserDtoMapper } from '$modules/user/application/mapper/user-dto.mapper';
import { UserEmail } from '$modules/user/domain/value-objects/email.vo';
import { InvaildCredentials } from '$modules/user/error/invaild-credentials.error';
import { createLogger } from '$shared/logger';

import type { AuthSessionCommandRepository } from '$modules/auth/domain/repositories/auth-session-command.repository';
import type { PasswordHaser } from '$modules/auth/domain/services/password-hasher';
import type { TokenHasher } from '$modules/auth/domain/services/token-hasher';
import type { TokenIssuer } from '$modules/auth/domain/services/token-issuer';
import type { UserDetailDto } from '$modules/user/application/dto/user-detail.dto';
import type { UserCommandRepository } from '$modules/user/domain/repositories/user-command.repository';
import type { RequestMetadata } from '$shared/http/lib/get-request-metadata';
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

  async execute(
    command: SignInCommand,
    { userAgent, ipAddress }: RequestMetadata,
  ): Promise<{
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
    const { token: accessToken } =
      await this.accessTokenIssuer.issueToken(acessTokenClaims);

    const refreshTokenId = AuthSessionUuid.generate();
    const refreshTokenClaims = RefreshTokenClaims.create({
      sub: user.id.getValue(),
      jti: refreshTokenId.getValue(),
    });
    const { token: refreshToken, expiresAt } =
      await this.refreshTokenIssuer.issueToken(refreshTokenClaims);

    if (!expiresAt) {
      throw new RefreshTokenMalFormed(SignInHandler.name);
    }

    const authSession = AuthSession.create(refreshTokenId, {
      userId: user.id,
      tokenHash: this.tokenHasher.create(refreshToken),
      revokeAt: null,
      ipAddress,
      userAgent,
      expiresAt,
    });

    await this.authSessionCommandRepository.save(authSession);

    logger.info(
      {
        details: {
          userId: user.id.getValue(),
          authSessionId: authSession.id.getValue(),
        },
      },
      'User signed in successfully',
    );

    return {
      accessToken,
      refreshToken,
      user: UserDtoMapper.fromEntity(user),
    };
  }
}

const logger = createLogger(SignInHandler.name);
