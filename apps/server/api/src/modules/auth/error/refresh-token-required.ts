import { UnauthorizedError } from '$shared/error';

import { AUTH_LOG_EVENT } from './constants/log-event';
import { AUTH_LOG_MESSAGE } from './constants/log-message';

export class AuthRefreshTokenRequiredError extends UnauthorizedError {
  constructor(scope: string) {
    super({
      event: AUTH_LOG_EVENT.AUTH_REFRESH_TOKEN_REQUIRED,
      message: AUTH_LOG_MESSAGE.AUTH_REFRESH_TOKEN_REQUIRED,
      scope,
    });
  }
}
