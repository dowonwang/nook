import { InternalServerError } from '$shared/errors/common.erorr';

import { USER_LOG_EVENT } from './constant/user-log-event';
import { USER_LOG_MESSAGE } from './constant/user-log-message';

export class UserTimeStampsRequired extends InternalServerError {
  constructor(scope: string) {
    super({
      event: USER_LOG_EVENT.USER_TIMESTAMPS_REQUIRED,
      message: USER_LOG_MESSAGE.USER_TIMESTAMPS_REQUIRED,
      scope,
    });
  }
}
