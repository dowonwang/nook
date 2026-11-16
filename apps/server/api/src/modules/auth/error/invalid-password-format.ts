import { UnprocessableContentError } from '$shared/error';

import { AUTH_LOG_EVENT } from './constants/log-event';
import { AUTH_LOG_MESSAGE } from './constants/log-message';

export class AuthInvalidPasswordFormatError extends UnprocessableContentError {
  constructor(scope: string) {
    super({
      event: AUTH_LOG_EVENT.AUTH_INVALID_PASSWORD_FORMAT,
      message: AUTH_LOG_MESSAGE.AUTH_INVALID_PASSWORD_FORMAT,
      code: 'auth_error_InvalidPasswordFormat',
      detail: {
        field: 'password',
      },
      scope,
    });
  }
}
