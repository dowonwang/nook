import { UnprocessableContent } from '$shared/error';

import { ORGANIZATION_LOG_EVENT } from './constant/organization-log-event';
import { ORGANIZATION_LOG_MESSAGE } from './constant/organization-log-message';

export class InvalidOrganizationMemberRole extends UnprocessableContent {
  constructor(scope: string) {
    super({
      event: ORGANIZATION_LOG_EVENT.ORG_INVALID_MEMBER_ROLE,
      message: ORGANIZATION_LOG_MESSAGE.ORG_INVALID_MEMBER_ROLE,
      code: 'organization_error_InvalidOrganizationMemberRole',
      detail: {
        field: 'member_role',
      },
      scope,
    });
  }
}
