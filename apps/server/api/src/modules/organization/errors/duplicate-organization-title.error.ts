import { ORGANIZATION_LOG_EVENT } from '$modules/organization/errors/constant/organization-log-event';
import { ORGANIZATION_LOG_MESSAGE } from '$modules/organization/errors/constant/organization-log-message';
import { ConflictError } from '$shared/errors/common.erorr';

export class DuplicateOrganizationTitle extends ConflictError {
  constructor(scope: string) {
    super({
      event: ORGANIZATION_LOG_EVENT.ORG_DUPLICATE_TITLE,
      message: ORGANIZATION_LOG_MESSAGE.ORG_DUPLICATE_TITLE,
      scope,
    });
  }
}
