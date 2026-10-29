import { UnprocessableContentError } from '$shared/error';

import { ORGANIZATION_LOG_EVENT } from './constants/log-event';
import { ORGANIZATION_LOG_MESSAGE } from './constants/log-message';

export class InvalidOrganizationMemberRoleError extends UnprocessableContentError {
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
