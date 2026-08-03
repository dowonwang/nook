import { ConflictError } from '$shared/error';

import { USER_LOG_EVENT } from './constant/user-log-event';
import { USER_LOG_MESSAGE } from './constant/user-log-message';

import type { User } from '$modules/user/domain';

export class EmailAlreadyExists extends ConflictError {
  constructor(scope: string, userId: User['id']) {
    super({
      event: USER_LOG_EVENT.USER_EMAIL_ALREADY_EXIST,
      message: USER_LOG_MESSAGE.USER_EMAIL_ALREADY_EXIST,
      scope,
      code: 'user_error_EmailAlreadyExists',
      detail: { userId },
    });
  }
}
