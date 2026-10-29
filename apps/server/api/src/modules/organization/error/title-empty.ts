import { UnprocessableContentError } from '$shared/error';

import { ORGANIZATION_LOG_EVENT } from './constants/log-event';
import { ORGANIZATION_LOG_MESSAGE } from './constants/log-message';

export class OrganizationTitleEmptyError extends UnprocessableContentError {
  constructor(scope: string) {
    super({
      event: ORGANIZATION_LOG_EVENT.ORG_TITLE_EMPTY,
      message: ORGANIZATION_LOG_MESSAGE.ORG_TITLE_EMPTY,
      scope,
    });
  }
}
