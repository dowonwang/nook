import type { Organization } from '$entities/organization/model/organization';
import type { OrganizationMemberRole } from '$entities/organization-member';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const status = [
  'PENDING', // 초대 발송(대기중)
  'ACCEPTED', // 수락함 (즉시 조직 참여)
  'CANCELED', // 관리자가 초대 취소
  'REJECTED', // 사용자 초대 거절
  'EXPIRED', // 유효기간 만료됨
] as const;

export type OrganizationInvitationStatus = (typeof status)[number];

export interface OrganizationInvitationInvitee {
  id: string;
  name: string;
  email: string;
}

export interface OrganizationInvitationInvitedBy {
  id: string;
  name: string;
  email: string;
}

export interface OrganizationSentInvitation {
  id: string;
  organizationId: string;
  invitee: OrganizationInvitationInvitee | null;
  role: OrganizationMemberRole;
  status: OrganizationInvitationStatus;
  expiresAt: Date;
}

export interface OrganizationReceivedInvitation {
  id: string;
  organization: Organization;
  invitedBy: OrganizationInvitationInvitedBy | null;
  role: OrganizationMemberRole;
  status: OrganizationInvitationStatus;
  expiresAt: string;
}
