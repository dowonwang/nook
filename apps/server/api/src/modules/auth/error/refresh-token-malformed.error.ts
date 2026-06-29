import { AUTH_LOG_EVENT } from '$modules/auth/error/constant/auth-log-event';
import { AUTH_LOG_MESSAGE } from '$modules/auth/error/constant/auth-log-message';
import { UnauthorizedError } from '$shared/error/common.error';

export class RefreshTokenMalFormed extends UnauthorizedError {
  constructor(scope: string) {
    super({
      event: AUTH_LOG_EVENT.AUTH_REFRESH_TOKEN_MALFORMED,
      message: AUTH_LOG_MESSAGE.AUTH_REFRESH_TOKEN_MALFORMED,
      scope,
    });
  }
}
