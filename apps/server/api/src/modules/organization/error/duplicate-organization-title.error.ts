import { ORGANIZATION_LOG_EVENT } from '$modules/organization/error/constant/organization-log-event';
import { ORGANIZATION_LOG_MESSAGE } from '$modules/organization/error/constant/organization-log-message';
import { ConflictError } from '$shared/error/common.error';

export class DuplicateOrganizationTitle extends ConflictError {
  constructor(scope: string) {
    super({
      event: ORGANIZATION_LOG_EVENT.ORG_DUPLICATE_TITLE,
      message: ORGANIZATION_LOG_MESSAGE.ORG_DUPLICATE_TITLE,
      scope,
    });
  }
}
