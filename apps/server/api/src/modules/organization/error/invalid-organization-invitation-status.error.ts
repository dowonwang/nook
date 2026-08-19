import { UnprocessableContent } from '$shared/error';

import { ORGANIZATION_LOG_EVENT } from './constant/organization-log-event';
import { ORGANIZATION_LOG_MESSAGE } from './constant/organization-log-message';

export class InvalidOrganizationInvitationStatus extends UnprocessableContent {
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
