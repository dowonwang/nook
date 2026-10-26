import { ConflictError } from '$shared/error';

import { AUTH_LOG_EVENT } from './constants/log-event';
import { AUTH_LOG_MESSAGE } from './constants/log-message';

import type { UserEntity } from '$modules/user/domain';

export class AuthEmailAlreadyExistsError extends ConflictError {
  constructor(scope: string, userId: UserEntity['id']) {
    super({
      event: AUTH_LOG_EVENT.AUTH_EMAIL_ALREADY_EXIST,
      message: AUTH_LOG_MESSAGE.AUTH_EMAIL_ALREADY_EXIST,
      scope,
      code: 'auth_error_EmailAlreadyExists',
      detail: { userId },
    });
  }
}
