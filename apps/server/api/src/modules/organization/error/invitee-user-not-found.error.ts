import { NotFoundError } from '$shared/error';

import { ORGANIZATION_LOG_EVENT } from './constant/organization-log-event';
import { ORGANIZATION_LOG_MESSAGE } from './constant/organization-log-message';

export class InviteeUserNotFound extends NotFoundError {
  constructor(scope: string) {
    super({
      event: ORGANIZATION_LOG_EVENT.ORG_INVITEE_USER_NOT_FOUND,
      message: ORGANIZATION_LOG_MESSAGE.ORG_INVITEE_USER_NOT_FOUND,
      code: 'organization_error_InviteeUserNotFound',
      scope,
    });
  }
}
