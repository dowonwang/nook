import { InternalServerError } from '$shared/errors/common.erorr';

import { USER_LOG_EVENT } from './constant/user-log-event';
import { USER_LOG_MESSAGE } from './constant/user-log-message';

export class InvalidUserUUID extends InternalServerError {
  constructor(scope: string, detail: unknown) {
    super({
      event: USER_LOG_EVENT.USER_UUID_INVALID,
      message: USER_LOG_MESSAGE.USER_UUID_INVALID,
      scope,
      detail,
    });
  }
}
