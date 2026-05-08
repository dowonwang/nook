import { ORGANIZATION_LOG_EVENT } from '$modules/organization/errors/constant/organization-log-event';
import { ORGANIZATION_LOG_MESSAGE } from '$modules/organization/errors/constant/organization-log-message';
import { UnprocessableContent } from '$shared/errors/common.erorr';

export class MinMemberConstraint extends UnprocessableContent {
  constructor(scope: string) {
    super({
      event: ORGANIZATION_LOG_EVENT.ORG_MIN_MEMBER_VIOLATION,
      message: ORGANIZATION_LOG_MESSAGE.ORG_MIN_MEMBER_VIOLATION,
      scope,
    });
  }
}
