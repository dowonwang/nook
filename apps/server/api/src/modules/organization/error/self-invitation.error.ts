import { BadRequestError } from '$shared/error';

import { ORGANIZATION_LOG_EVENT } from './constant/organization-log-event';
import { ORGANIZATION_LOG_MESSAGE } from './constant/organization-log-message';

export class SelfInvitation extends BadRequestError {
  constructor(scope: string) {
    super({
      event: ORGANIZATION_LOG_EVENT.ORG_SELF_INVITATION,
      message: ORGANIZATION_LOG_MESSAGE.ORG_SELF_INVITATION,
      code: 'organization_error_SelfInvitation',
      scope,
    });
  }
}
