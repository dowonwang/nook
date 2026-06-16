import { InternalServerError } from '$shared/errors/common.erorr';

import { AUTH_LOG_EVENT } from './constant/auth-log-event';
import { AUTH_LOG_MESSAGE } from './constant/auth-log-message';

export class MissingJwtSecret extends InternalServerError {
  constructor(scope: string) {
    super({
      event: AUTH_LOG_EVENT.AUTH_MISSING_JWT_TOKEN_SECRET,
      message: AUTH_LOG_MESSAGE.AUTH_MISSING_JWT_TOKEN_SECRET,
      scope,
    });
  }
}
