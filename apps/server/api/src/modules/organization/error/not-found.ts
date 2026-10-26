import { NotFoundError } from '$shared/error';

import { ORGANIZATION_LOG_EVENT } from './constants/log-event';
import { ORGANIZATION_LOG_MESSAGE } from './constants/log-message';

export class OrganizationNotFoundError extends NotFoundError {
  constructor(scope: string) {
    super({
      event: ORGANIZATION_LOG_EVENT.ORG_NOT_FOUND,
      message: ORGANIZATION_LOG_MESSAGE.ORG_NOT_FOUND,
      scope,
    });
  }
}
