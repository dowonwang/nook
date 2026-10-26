import { UnprocessableContentError } from '$shared/error';

import { USER_LOG_EVENT } from './constants/log-event';
import { USER_LOG_MESSAGE } from './constants/log-message';

export class InvalidUserEmailError extends UnprocessableContentError {
  constructor(scope: string) {
    super({
      event: USER_LOG_EVENT.USER_INVALID_EMAIL,
      message: USER_LOG_MESSAGE.USER_INVALID_EMAIL,
      code: 'user_error_InvalidUserEmail',
      detail: {
        field: 'email',
      },
      scope,
    });
  }
}
