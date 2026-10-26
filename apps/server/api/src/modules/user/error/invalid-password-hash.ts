import { InternalServerError } from '$shared/error';

import { USER_LOG_EVENT } from './constants/log-event';
import { USER_LOG_MESSAGE } from './constants/log-message';

export class InvalidUserPasswordHashError extends InternalServerError {
  constructor(scope: string) {
    super({
      event: USER_LOG_EVENT.USER_PASSWORD_HASH_INVALID,
      message: USER_LOG_MESSAGE.USER_PASSWORD_HASH_INVALID,
      scope,
    });
  }
}
