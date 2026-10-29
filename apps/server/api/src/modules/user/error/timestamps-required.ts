import { InternalServerError } from '$shared/error';

import { USER_LOG_EVENT } from './constants/log-event';
import { USER_LOG_MESSAGE } from './constants/log-message';

export class UserTimestampsRequiredError extends InternalServerError {
  constructor(scope: string) {
    super({
      event: USER_LOG_EVENT.USER_TIMESTAMPS_REQUIRED,
      message: USER_LOG_MESSAGE.USER_TIMESTAMPS_REQUIRED,
      scope,
    });
  }
}
