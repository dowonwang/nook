import { NotFoundError } from '$shared/error/common.error';

import { USER_LOG_EVENT } from './constant/user-log-event';
import { USER_LOG_MESSAGE } from './constant/user-log-message';

export class UserNotFound extends NotFoundError {
  constructor(scope: string) {
    super({
      event: USER_LOG_EVENT.USER_NOT_FOUND,
      message: USER_LOG_MESSAGE.USER_NOT_FOUND,
      code: 'user_error_UserNotFound',
      scope,
    });
  }
}
