import { InternalServerError } from '$shared/error';
import { LOG_EVENT, LOG_MESSAGE } from '$shared/logger';

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
