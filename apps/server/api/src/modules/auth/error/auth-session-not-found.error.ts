import { NotFoundError } from '$shared/error';

import { AUTH_LOG_EVENT } from './constant/auth-log-event';
import { AUTH_LOG_MESSAGE } from './constant/auth-log-message';

export class AuthSessionNotFound extends NotFoundError {
  constructor(scope: string) {
    super({
      event: AUTH_LOG_EVENT.AUTH_SESSION_NOT_FOUND,
      message: AUTH_LOG_MESSAGE.AUTH_SESSION_NOT_FOUND,
      scope,
    });
  }
}
