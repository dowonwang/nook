import { ConflictError } from '$shared/error';

import { ORGANIZATION_LOG_EVENT } from './constants/log-event';
import { ORGANIZATION_LOG_MESSAGE } from './constants/log-message';

export class DuplicateOrganizationSlugError extends ConflictError {
  constructor(scope: string) {
    super({
      event: ORGANIZATION_LOG_EVENT.ORG_DUPLICATE_SLUG,
      message: ORGANIZATION_LOG_MESSAGE.ORG_DUPLICATE_SLUG,
      code: 'organization_error_DuplicateOrganizationSlug',
      scope,
    });
  }
}
