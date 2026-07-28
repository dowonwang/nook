import { UnprocessableContent } from '$shared/error';

import { ORGANIZATION_LOG_EVENT } from './constant/organization-log-event';
import { ORGANIZATION_LOG_MESSAGE } from './constant/organization-log-message';

export class OrganizationTitleEmpty extends UnprocessableContent {
  constructor(scope: string) {
    super({
      event: ORGANIZATION_LOG_EVENT.ORG_TITLE_EMPTY,
      message: ORGANIZATION_LOG_MESSAGE.ORG_TITLE_EMPTY,
      scope,
    });
  }
}
