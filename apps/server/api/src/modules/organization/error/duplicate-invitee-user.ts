import { UnprocessableContentError } from '$shared/error';

import { ORGANIZATION_LOG_EVENT } from './constants/log-event';
import { ORGANIZATION_LOG_MESSAGE } from './constants/log-message';

export class OrganizationDuplicateInviteeUserError extends UnprocessableContentError {
  constructor(scope: string) {
    super({
      event: ORGANIZATION_LOG_EVENT.ORG_DUPLICATE_INVITEE_USER,
      message: ORGANIZATION_LOG_MESSAGE.ORG_DUPLICATE_INVITEE_USER,
      code: 'organization_error_DuplicateInviteeUser',
      scope,
    });
  }
}
