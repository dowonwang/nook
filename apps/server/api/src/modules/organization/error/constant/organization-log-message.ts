import type { OrganizationLogEventMessage } from './organization-log-event';

export const ORGANIZATION_LOG_MESSAGE: OrganizationLogEventMessage = {
  ORG_DUPLICATE_TITLE: 'Duplicate organization title detected',
  ORG_TITLE_EMPTY: 'Organization title cannot be empty or null',
  ORG_NOT_FOUND: 'Organization not found for the given identifier',
  ORG_MIN_MEMBER_VIOLATION: 'At least one member required for initialization',
  ORG_MEMBER_UNAFFILIATED_ACCESS:
    'Member has no affiliation with the requested organization',
  ORG_MEMBER_DUPLICATE_ENTRY: 'Duplicate member data detected in organization',
  ORG_ADMIN_REQUIREMENT: 'Admin count requirement failed: exactly 1 required',
  ORG_ADMIN_LIMIT_EXCEED: 'Admin count exceeded: max 1 allowed',
  ORG_INSUFFICIENT_PERMISSION: 'Access denied: missing extra permissions',
  ORG_INVALID_MEMBER_ROLE: 'Organization member role is invalid',
  ORG_INVALID_INVITATION_STATUS: 'Organization invitation status is invalid',
  ORG_DUPLICATE_INVITEE_USER: 'Duplicate invitee user id',
  ORG_INVITEE_USER_NOT_FOUND: 'Invitee user not found',
  ORG_SELF_INVITATION: 'Can not invite yourself',
  ORG_PENDING_INVITATION_EXIST: 'Already pending organization invitation',
  ORG_INVITATION_NOT_FOUND:
    'Organization Invitation not found for the given identifier',
  ORG_INVITATION_INSUFFICIENT_PERMISSION:
    'Access denied: invitee user is not equal',
  ORG_INVITATION_EXPIRED: 'This organization invitation is already expired',
} as const;
