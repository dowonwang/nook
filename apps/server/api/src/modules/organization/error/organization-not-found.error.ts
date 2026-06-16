import { ORGANIZATION_LOG_EVENT } from '$modules/organization/error/constant/organization-log-event';
import { ORGANIZATION_LOG_MESSAGE } from '$modules/organization/error/constant/organization-log-message';
import { NotFoundError } from '$shared/error/common.error';

export class OrganizationNotFound extends NotFoundError {
  constructor(scope: string) {
    super({
      event: ORGANIZATION_LOG_EVENT.ORG_NOT_FOUND,
      message: ORGANIZATION_LOG_MESSAGE.ORG_NOT_FOUND,
      scope,
    });
  }
}
