import { UnprocessableContent } from '$shared/error';

import { USER_LOG_EVENT } from './constant/user-log-event';
import { USER_LOG_MESSAGE } from './constant/user-log-message';

export class InvalidUserEmail extends UnprocessableContent {
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
