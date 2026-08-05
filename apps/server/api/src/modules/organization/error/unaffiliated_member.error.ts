import { ForbiddenError } from '$shared/error';

import { ORGANIZATION_LOG_EVENT } from './constant/organization-log-event';
import { ORGANIZATION_LOG_MESSAGE } from './constant/organization-log-message';

export class UnaffiliatedMember extends ForbiddenError {
  constructor(scope: string) {
    super({
      event: ORGANIZATION_LOG_EVENT.ORG_MEMBER_UNAFFILIATED_ACCESS,
      message: ORGANIZATION_LOG_MESSAGE.ORG_MEMBER_UNAFFILIATED_ACCESS,
      scope,
    });
  }
}
