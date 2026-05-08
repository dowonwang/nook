import { ORGANIZATION_LOG_EVENT } from '$modules/organization/errors/constant/organization-log-event';
import { ORGANIZATION_LOG_MESSAGE } from '$modules/organization/errors/constant/organization-log-message';
import { ConflictError } from '$shared/errors/common.erorr';

export class DuplicateOrganizationMember extends ConflictError {
  constructor(scope: string) {
    super({
      event: ORGANIZATION_LOG_EVENT.ORG_MEMBER_DUPLICATE_ENTRY,
      message: ORGANIZATION_LOG_MESSAGE.ORG_MEMBER_DUPLICATE_ENTRY,
      scope,
    });
  }
}
