import {
  AccessTokenClaims,
  AuthSession,
  AuthSessionUuid,
  RefreshTokenClaims,
  type AuthSessionCommandRepository,
} from '$modules/auth/domain';
import { RefreshTokenMalFormed } from '$modules/auth/error';
import { UserDtoMapper } from '$modules/user/application';
import { UserEmail, type UserCommandRepository } from '$modules/user/domain';
import { InvaildCredentials } from '$modules/user/error';
import { createLogger } from '$shared/logger';

import type { RequestMetadata } from '$shared/http';
import type { SignInCommand, SingInResult } from './sign-in.command';
import type { PasswordHaser } from '../../ports/password-hasher.port';
import type { TokenHasher } from '../../ports/token-hasher.port';
import type { TokenIssuer } from '../../ports/token-issuer.port';

export class SignInHandler {
  private readonly logger = createLogger(SignInHandler.name);

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
  ): Promise<SingInResult> {
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
      revokedAt: null,
      ipAddress,
      userAgent,
      expiresAt,
    });

    await this.authSessionCommandRepository.save(authSession);

    this.logger.info(
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
