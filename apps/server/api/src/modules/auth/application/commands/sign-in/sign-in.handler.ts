import { type AuthSessionCommandRepository } from '$modules/auth/domain';
import { UserDtoMapper } from '$modules/user/application';
import { UserEmail } from '$modules/user/domain';
import { createLogger } from '$shared/logger';

import type { RequestMetadata } from '$shared/http';
import type { SignInCommand, SingInResult } from './sign-in.command';
import type { AuthTokenIssuer } from '../../services/auth-token-issuer.service';
import type { CredentialAuthenticator } from '../../services/credential-authenticator.service';

export class SignInHandler {
  private readonly logger = createLogger(SignInHandler.name);

  constructor(
    private readonly authSessionCommandRepository: AuthSessionCommandRepository,
    private readonly credentialAuthenticator: CredentialAuthenticator,
    private readonly authTokenIssuer: AuthTokenIssuer,
  ) {}

  async execute(
    command: SignInCommand,
    requestMetaData: RequestMetadata,
  ): Promise<SingInResult> {
    const email = UserEmail.create(command.email);
    const user = await this.credentialAuthenticator.authenticate({
      email,
      password: command.password,
    });

    const { authSession, accessToken, refreshToken } =
      await this.authTokenIssuer.issue(user, requestMetaData);

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
