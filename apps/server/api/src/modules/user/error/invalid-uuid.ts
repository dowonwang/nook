import { InternalServerError } from '$shared/error';

import { USER_LOG_EVENT } from './constants/log-event';
import { USER_LOG_MESSAGE } from './constants/log-message';

export class InvalidUserUuidError extends InternalServerError {
  constructor(scope: string, detail: unknown) {
    super({
      event: USER_LOG_EVENT.USER_UUID_INVALID,
      message: USER_LOG_MESSAGE.USER_UUID_INVALID,
      scope,
      detail,
    });
  }
}
