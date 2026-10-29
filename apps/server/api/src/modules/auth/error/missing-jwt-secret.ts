import { InternalServerError } from '$shared/error';

import { AUTH_LOG_EVENT } from './constants/log-event';
import { AUTH_LOG_MESSAGE } from './constants/log-message';

export class AuthMissingJwtSecretError extends InternalServerError {
  constructor(scope: string) {
    super({
      event: AUTH_LOG_EVENT.AUTH_MISSING_JWT_TOKEN_SECRET,
      message: AUTH_LOG_MESSAGE.AUTH_MISSING_JWT_TOKEN_SECRET,
      scope,
    });
  }
}
