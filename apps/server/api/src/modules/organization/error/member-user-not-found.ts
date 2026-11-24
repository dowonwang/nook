import { NotFoundError } from '$shared/error';

import { ORGANIZATION_LOG_EVENT } from './constants/log-event';
import { ORGANIZATION_LOG_MESSAGE } from './constants/log-message';

export class OrganizationMemberUserNotFoundError extends NotFoundError {
  constructor(scope: string) {
    super({
      event: ORGANIZATION_LOG_EVENT.ORG_MEMBER_USER_NOT_FOUND,
      message: ORGANIZATION_LOG_MESSAGE.ORG_MEMBER_USER_NOT_FOUND,
      code: 'organization_error_MemberUserNotFound',
      scope,
    });
  }
}
