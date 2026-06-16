import { InternalServerError } from '$shared/errors/common.erorr';

import { USER_LOG_EVENT } from './constant/user-log-event';
import { USER_LOG_MESSAGE } from './constant/user-log-message';

export class InvalidPasswordHash extends InternalServerError {
  constructor(scope: string) {
    super({
      event: USER_LOG_EVENT.USER_PASSWORD_HASH_INVALID,
      message: USER_LOG_MESSAGE.USER_PASSWORD_HASH_INVALID,
      scope,
    });
  }
}
