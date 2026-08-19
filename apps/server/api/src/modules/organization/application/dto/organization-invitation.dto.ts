import type {
  OrganizationInvitationStatusValue,
  OrganizationMemberRoleValue,
} from '$modules/organization/domain';

interface Invitee {
  id: string;
  name: string;
  email: string;
}

export interface OrganizationInvitationDto {
  id: string;
  organizationId: string;
  invitee: Invitee | null;
  role: OrganizationMemberRoleValue;
  status: OrganizationInvitationStatusValue;
  expiresAt: string;
}
