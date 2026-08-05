import { UnauthorizedError } from '$shared/error';

import { AUTH_LOG_EVENT } from './constant/auth-log-event';
import { AUTH_LOG_MESSAGE } from './constant/auth-log-message';

export class InvalidAccessTokenClaims extends UnauthorizedError {
  constructor(scope: string) {
    super({
      scope,
      event: AUTH_LOG_EVENT.AUTH_INVALID_ACCESS_TOKEN_CLAIMS,
      message: AUTH_LOG_MESSAGE.AUTH_INVALID_ACCESS_TOKEN_CLAIMS,
    });
  }
}
