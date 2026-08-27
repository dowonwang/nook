import type {
  OrganizationInvitationStatusValue,
  OrganizationMemberRoleValue,
} from '$modules/organization/domain';
import type { OrganizationDto } from './organization.dto';

interface Invitee {
  id: string;
  name: string;
  email: string;
}

interface Inviter {
  id: string;
  name: string;
  email: string;
}

export interface OrganizationSentInvitationDto {
  id: string;
  organizationId: string;
  invitee: Invitee | null;
  role: OrganizationMemberRoleValue;
  status: OrganizationInvitationStatusValue;
  expiresAt: string;
}

export interface OrganizationReceivedInvitationDto {
  id: string;
  organization: OrganizationDto;
  invitedBy: Inviter | null;
  role: OrganizationMemberRoleValue;
  status: OrganizationInvitationStatusValue;
  expiresAt: string;
}
