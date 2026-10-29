import { UnauthorizedError } from '$shared/error';

import { AUTH_LOG_EVENT } from './constants/log-event';
import { AUTH_LOG_MESSAGE } from './constants/log-message';

export class AuthInvalidRefreshTokenClaimsError extends UnauthorizedError {
  constructor(scope: string) {
    super({
      scope,
      event: AUTH_LOG_EVENT.AUTH_INVALID_REFRESH_TOKEN_CLAIMS,
      message: AUTH_LOG_MESSAGE.AUTH_INVALID_REFRESH_TOKEN_CLAIMS,
    });
  }
}
