import { ORGANIZATION_LOG_EVENT } from '$modules/organization/errors/constant/organization-log-event';
import { ORGANIZATION_LOG_MESSAGE } from '$modules/organization/errors/constant/organization-log-message';
import { ForbiddenError } from '$shared/errors/common.erorr';

export class OrganizationAccessDenied extends ForbiddenError {
  constructor(scope: string) {
    super({
      event: ORGANIZATION_LOG_EVENT.ORG_INSUFFICIENT_PERMISSION,
      message: ORGANIZATION_LOG_MESSAGE.ORG_INSUFFICIENT_PERMISSION,
      scope,
    });
  }
}
