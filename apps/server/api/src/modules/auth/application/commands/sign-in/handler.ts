import { type AuthSessionCommandRepository } from '$modules/auth/domain';
import { createLogger } from '$shared/logger';

import { SignInCommand } from './command';
import { AuthUserDtoMapper } from '../../mappers/user';

import type { RequestMetadata } from '$shared/http';
import type { SignInInput, SignInResult } from './command';
import type { CredentialAuthenticatorService } from '../../services/credential-authenticator';
import type { AuthTokenIssuerService } from '../../services/token-issuer';

export class SignInHandler {
  private readonly logger = createLogger(SignInHandler.name);

  constructor(
    private readonly authSessionCommandRepository: AuthSessionCommandRepository,
    private readonly credentialAuthenticator: CredentialAuthenticatorService,
    private readonly authTokenIssuer: AuthTokenIssuerService,
  ) {}

  async execute(
    input: SignInInput,
    requestMetadata: RequestMetadata,
  ): Promise<SignInResult> {
    const command = new SignInCommand(input);
    const user = await this.credentialAuthenticator.authenticate({
      email: command.email,
      password: command.password,
    });

    const { authSession, accessToken, refreshToken } =
      await this.authTokenIssuer.issue(user, requestMetadata);

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
      user: AuthUserDtoMapper.fromEntity(user),
    };
  }
}
