import { UnauthorizedError } from '$shared/error';

import { AUTH_LOG_EVENT } from './constant/auth-log-event';
import { AUTH_LOG_MESSAGE } from './constant/auth-log-message';

export class RefreshTokenRequired extends UnauthorizedError {
  constructor(scope: string) {
    super({
      event: AUTH_LOG_EVENT.AUTH_REFRESH_TOKEN_REQUIRED,
      message: AUTH_LOG_MESSAGE.AUTH_REFRESH_TOKEN_REQUIRED,
      scope,
    });
  }
}
