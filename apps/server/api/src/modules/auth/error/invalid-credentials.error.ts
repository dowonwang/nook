import { UnauthorizedError } from '$shared/error';

import { AUTH_LOG_EVENT } from './constant/auth-log-event';
import { AUTH_LOG_MESSAGE } from './constant/auth-log-message';

export class InvalidCredentials extends UnauthorizedError {
  constructor(scope: string) {
    super({
      event: AUTH_LOG_EVENT.AUTH_INVALID_CREDENTIALS,
      message: AUTH_LOG_MESSAGE.AUTH_INVALID_CREDENTIALS,
      code: 'auth_error_InvalidCredentials',
      scope,
    });
  }
}
