import { ConflictError } from '$shared/error';

import { ORGANIZATION_LOG_EVENT } from './constants/log-event';
import { ORGANIZATION_LOG_MESSAGE } from './constants/log-message';

export class DuplicateOrganizationTitleError extends ConflictError {
  constructor(scope: string) {
    super({
      event: ORGANIZATION_LOG_EVENT.ORG_DUPLICATE_TITLE,
      message: ORGANIZATION_LOG_MESSAGE.ORG_DUPLICATE_TITLE,
      scope,
    });
  }
}
