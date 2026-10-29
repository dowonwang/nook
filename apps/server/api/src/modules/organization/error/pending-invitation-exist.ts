import { ConflictError } from '$shared/error';

import { ORGANIZATION_LOG_EVENT } from './constants/log-event';
import { ORGANIZATION_LOG_MESSAGE } from './constants/log-message';

export class OrganizationPendingInvitationExistError extends ConflictError {
  constructor(scope: string) {
    super({
      event: ORGANIZATION_LOG_EVENT.ORG_PENDING_INVITATION_EXIST,
      message: ORGANIZATION_LOG_MESSAGE.ORG_PENDING_INVITATION_EXIST,
      code: 'organization_error_PendingInvitationExist',
      scope,
    });
  }
}
