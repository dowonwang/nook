import { ConflictError } from '$shared/error';

import { AUTH_LOG_EVENT } from './constant/auth-log-event';
import { AUTH_LOG_MESSAGE } from './constant/auth-log-message';

import type { User } from '$modules/user/domain';

export class EmailAlreadyExists extends ConflictError {
  constructor(scope: string, userId: User['id']) {
    super({
      event: AUTH_LOG_EVENT.AUTH_EMAIL_ALREADY_EXIST,
      message: AUTH_LOG_MESSAGE.AUTH_EMAIL_ALREADY_EXIST,
      scope,
      code: 'auth_error_EmailAlreadyExists',
      detail: { userId },
    });
  }
}
