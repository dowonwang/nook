import { ConflictError } from '$shared/error';

import { ORGANIZATION_LOG_EVENT } from './constants/log-event';
import { ORGANIZATION_LOG_MESSAGE } from './constants/log-message';

export class DuplicateOrganizationMemberError extends ConflictError {
  constructor(scope: string) {
    super({
      event: ORGANIZATION_LOG_EVENT.ORG_MEMBER_DUPLICATE_ENTRY,
      message: ORGANIZATION_LOG_MESSAGE.ORG_MEMBER_DUPLICATE_ENTRY,
      scope,
    });
  }
}
