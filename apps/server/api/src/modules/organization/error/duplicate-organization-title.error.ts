import { ConflictError } from '$shared/error';

import { ORGANIZATION_LOG_EVENT } from './constant/organization-log-event';
import { ORGANIZATION_LOG_MESSAGE } from './constant/organization-log-message';

export class DuplicateOrganizationTitle extends ConflictError {
  constructor(scope: string) {
    super({
      event: ORGANIZATION_LOG_EVENT.ORG_DUPLICATE_TITLE,
      message: ORGANIZATION_LOG_MESSAGE.ORG_DUPLICATE_TITLE,
      scope,
    });
  }
}
