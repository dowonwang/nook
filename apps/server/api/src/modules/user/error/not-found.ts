import { NotFoundError } from '$shared/error';

import { USER_LOG_EVENT } from './constants/log-event';
import { USER_LOG_MESSAGE } from './constants/log-message';

export class UserNotFoundError extends NotFoundError {
  constructor(scope: string) {
    super({
      event: USER_LOG_EVENT.USER_NOT_FOUND,
      message: USER_LOG_MESSAGE.USER_NOT_FOUND,
      code: 'user_error_UserNotFound',
      scope,
    });
  }
}
