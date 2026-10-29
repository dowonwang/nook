import { BadRequestError } from '$shared/error';

import { ORGANIZATION_LOG_EVENT } from './constants/log-event';
import { ORGANIZATION_LOG_MESSAGE } from './constants/log-message';

export class OrganizationSelfInvitationError extends BadRequestError {
  constructor(scope: string) {
    super({
      event: ORGANIZATION_LOG_EVENT.ORG_SELF_INVITATION,
      message: ORGANIZATION_LOG_MESSAGE.ORG_SELF_INVITATION,
      code: 'organization_error_SelfInvitation',
      scope,
    });
  }
}
