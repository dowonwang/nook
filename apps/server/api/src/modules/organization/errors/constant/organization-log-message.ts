import type { OrganizationLogEventMessage } from '$modules/organization/errors/constant/organization-log-event';

export const ORGANIZATION_LOG_MESSAGE: OrganizationLogEventMessage = {
  ORG_DUPLICATE_TITLE: 'Duplicate organization title detected',
  ORG_TITLE_EMPTY: 'Organization title cannot be empty or null',
  ORG_NOT_FOUND: 'Organzation not found for the given identifier',
  ORG_MIN_MEMBER_VIOLATION: 'At least one mebmer required for initialization',
  ORG_MEMBER_UNAFFILIATED_ACCESS:
    'Member has no affiliation with the requested organization',
  ORG_MEMBER_DUPLICATE_ENTRY: 'Duplicate member data detected in organization',
  ORG_ADMIN_REQUIREMENT: 'Admin count requirement failed: exactly 1 required',
  ORG_ADMIN_LIMIT_EXCEED: 'Admin count exceeded: max 1 allowed',
  ORG_INSUFFICIENT_PERMISSION: 'Access denied: missing extra permissions',
} as const;
