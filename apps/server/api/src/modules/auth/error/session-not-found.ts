import { NotFoundError } from '$shared/error';

import { AUTH_LOG_EVENT } from './constants/log-event';
import { AUTH_LOG_MESSAGE } from './constants/log-message';

export class AuthSessionNotFoundError extends NotFoundError {
  constructor(scope: string) {
    super({
      event: AUTH_LOG_EVENT.AUTH_SESSION_NOT_FOUND,
      message: AUTH_LOG_MESSAGE.AUTH_SESSION_NOT_FOUND,
      scope,
    });
  }
}
