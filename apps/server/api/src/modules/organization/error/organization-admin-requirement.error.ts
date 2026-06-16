import { ORGANIZATION_LOG_EVENT } from '$modules/organization/error/constant/organization-log-event';
import { ORGANIZATION_LOG_MESSAGE } from '$modules/organization/error/constant/organization-log-message';
import { UnprocessableContent } from '$shared/error/common.error';

export class OrganizationAdminRequirement extends UnprocessableContent {
  constructor(scope: string) {
    super({
      event: ORGANIZATION_LOG_EVENT.ORG_ADMIN_REQUIREMENT,
      message: ORGANIZATION_LOG_MESSAGE.ORG_ADMIN_REQUIREMENT,
      scope,
    });
  }
}
