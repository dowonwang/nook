import { UnauthorizedError } from '$shared/error';

import { AUTH_LOG_EVENT } from './constants/log-event';
import { AUTH_LOG_MESSAGE } from './constants/log-message';

export class AuthInvalidCredentialsError extends UnauthorizedError {
  constructor(scope: string) {
    super({
      event: AUTH_LOG_EVENT.AUTH_INVALID_CREDENTIALS,
      message: AUTH_LOG_MESSAGE.AUTH_INVALID_CREDENTIALS,
      code: 'auth_error_InvalidCredentials',
      scope,
    });
  }
}
