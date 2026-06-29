import { AUTH_LOG_EVENT } from '$modules/auth/error/constant/auth-log-event';
import { AUTH_LOG_MESSAGE } from '$modules/auth/error/constant/auth-log-message';
import { NotFoundError } from '$shared/error/common.error';

export class AuthSessionNotFound extends NotFoundError {
  constructor(scope: string) {
    super({
      event: AUTH_LOG_EVENT.AUTH_SESSION_NOT_FOUND,
      message: AUTH_LOG_MESSAGE.AUTH_SESSION_NOT_FOUND,
      scope,
    });
  }
}
