import { UnprocessableContent } from '$shared/error';

import { USER_LOG_EVENT } from './constant/user-log-event';
import { USER_LOG_MESSAGE } from './constant/user-log-message';

export class InvalidUserName extends UnprocessableContent {
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
