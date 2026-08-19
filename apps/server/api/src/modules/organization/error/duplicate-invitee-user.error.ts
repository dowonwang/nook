import { UnprocessableContent } from '$shared/error';

import { ORGANIZATION_LOG_EVENT } from './constant/organization-log-event';
import { ORGANIZATION_LOG_MESSAGE } from './constant/organization-log-message';

export class DuplicateInviteeUser extends UnprocessableContent {
  constructor(scope: string) {
    super({
      event: ORGANIZATION_LOG_EVENT.ORG_DUPLICATE_INVITEE_USER,
      message: ORGANIZATION_LOG_MESSAGE.ORG_DUPLICATE_INVITEE_USER,
      code: 'organization_error_DuplicateInviteeUser',
      scope,
    });
  }
}
