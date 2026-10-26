import { UnprocessableContentError } from '$shared/error';

import { ORGANIZATION_LOG_EVENT } from './constants/log-event';
import { ORGANIZATION_LOG_MESSAGE } from './constants/log-message';

export class InvalidOrganizationInvitationStatusError extends UnprocessableContentError {
  constructor(scope: string) {
    super({
      event: ORGANIZATION_LOG_EVENT.ORG_INVALID_INVITATION_STATUS,
      message: ORGANIZATION_LOG_MESSAGE.ORG_INVALID_INVITATION_STATUS,
      code: 'organization_error_InvalidOrganizationInvitationStatus',
      detail: {
        field: 'invitation_status',
      },
      scope,
    });
  }
}
