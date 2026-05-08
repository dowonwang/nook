import { InternalServerError } from '$shared/errors/common.erorr';
import { LOG_EVENT } from '$shared/logger/constant/log-event';
import { LOG_MESSAGE } from '$shared/logger/constant/log-message';

export class InvalidUuid extends InternalServerError {
  constructor(scope: string, detail?: unknown) {
    super({
      scope,
      event: LOG_EVENT.DDD_INVALID_UUID_VO,
      message: LOG_MESSAGE.DDD_INVALID_UUID_VO,
      detail,
    });
  }
}
