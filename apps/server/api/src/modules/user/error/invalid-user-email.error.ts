import { USER_LOG_EVENT } from '$modules/user/error/constant/user-log-event';
import { USER_LOG_MESSAGE } from '$modules/user/error/constant/user-log-message';
import { UnprocessableContent } from '$shared/error/common.error';

export class InvalidUserEmail extends UnprocessableContent {
  constructor(scope: string) {
    super({
      event: USER_LOG_EVENT.USER_INVALID_EMAIL,
      message: USER_LOG_MESSAGE.USER_INVALID_EMAIL,
      code: 'user.error.InvalidUserEmail',
      detail: {
        field: 'email',
      },
      scope,
    });
  }
}
