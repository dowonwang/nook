import { UnprocessableContent } from '$shared/error';

import { ORGANIZATION_LOG_EVENT } from './constant/organization-log-event';
import { ORGANIZATION_LOG_MESSAGE } from './constant/organization-log-message';

export class OrganizationAdminLimitExceeded extends UnprocessableContent {
  constructor(scope: string) {
    super({
      event: ORGANIZATION_LOG_EVENT.ORG_ADMIN_LIMIT_EXCEED,
      message: ORGANIZATION_LOG_MESSAGE.ORG_ADMIN_LIMIT_EXCEED,
      scope,
    });
  }
}
