import { UnprocessableContentError } from '$shared/error';

import { ORGANIZATION_LOG_EVENT } from './constants/log-event';
import { ORGANIZATION_LOG_MESSAGE } from './constants/log-message';

export class InvalidOrganizationSlugError extends UnprocessableContentError {
  constructor(scope: string) {
    super({
      event: ORGANIZATION_LOG_EVENT.ORG_INVALID_SLUG,
      message: ORGANIZATION_LOG_MESSAGE.ORG_INVALID_SLUG,
      code: 'organization_error_InvalidOrganizationSlug',
      detail: {
        field: 'slug',
      },
      scope,
    });
  }
}
