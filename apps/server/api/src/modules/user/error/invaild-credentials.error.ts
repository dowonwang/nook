import { UnauthorizedError } from '$shared/error/common.error';

import { USER_LOG_EVENT } from './constant/user-log-event';
import { USER_LOG_MESSAGE } from './constant/user-log-message';

export class InvaildCredentials extends UnauthorizedError {
  constructor(scope: string) {
    super({
      event: USER_LOG_EVENT.USER_INVAILD_CREDENTIALS,
      message: USER_LOG_MESSAGE.USER_INVAILD_CREDENTIALS,
      code: 'user_error_InvaildCredentials',
      scope,
    });
  }
}
