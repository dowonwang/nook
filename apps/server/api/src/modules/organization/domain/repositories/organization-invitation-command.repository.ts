import type { UserUuid } from '$modules/user/domain';
import type { OrganizationInvitation } from '../aggregates/organization-invitation.aggregate';
import type { OrganizationInvitationUuid } from '../value-objects/organization-invitation-uuid.vo';
import type { OrganizationUuid } from '../value-objects/organization-uuid.vo';

export interface OrganizationInvitationCommandRepository {
  save(invitation: OrganizationInvitation): Promise<void>;
  findById(
    id: OrganizationInvitationUuid,
  ): Promise<OrganizationInvitation | null>;
  existsPendingInvitation(input: {
    organizationId: OrganizationUuid;
    inviteeUserId: UserUuid;
  }): Promise<boolean>;
}
