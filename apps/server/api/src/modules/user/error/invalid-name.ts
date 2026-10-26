import { UnprocessableContentError } from '$shared/error';

import { USER_LOG_EVENT } from './constants/log-event';
import { USER_LOG_MESSAGE } from './constants/log-message';

export class InvalidUserNameError extends UnprocessableContentError {
  constructor(scope: string) {
    super({
      event: USER_LOG_EVENT.USER_INVALID_NAME,
      message: USER_LOG_MESSAGE.USER_INVALID_NAME,
      code: 'user_error_InvalidUserName',
      detail: {
        field: 'name',
      },
      scope,
    });
  }
}
