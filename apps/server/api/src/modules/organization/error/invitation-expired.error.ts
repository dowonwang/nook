import { UnprocessableContent } from '$shared/error';

import { ORGANIZATION_LOG_EVENT } from './constant/organization-log-event';
import { ORGANIZATION_LOG_MESSAGE } from './constant/organization-log-message';

export class OrganizationInvitationExpired extends UnprocessableContent {
  constructor(scope: string) {
    super({
      event: ORGANIZATION_LOG_EVENT.ORG_INVITATION_EXPIRED,
      message: ORGANIZATION_LOG_MESSAGE.ORG_INVITATION_EXPIRED,
      scope,
    });
  }
}
