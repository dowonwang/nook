import { ForbiddenError } from '$shared/error';

import { ORGANIZATION_LOG_EVENT } from './constants/log-event';
import { ORGANIZATION_LOG_MESSAGE } from './constants/log-message';

export class OrganizationUnaffiliatedMemberError extends ForbiddenError {
  constructor(scope: string) {
    super({
      event: ORGANIZATION_LOG_EVENT.ORG_MEMBER_UNAFFILIATED_ACCESS,
      message: ORGANIZATION_LOG_MESSAGE.ORG_MEMBER_UNAFFILIATED_ACCESS,
      scope,
    });
  }
}
