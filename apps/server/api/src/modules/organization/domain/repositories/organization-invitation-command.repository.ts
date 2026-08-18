import type { UserUuid } from '$modules/user/domain';
import type { OrganizationInvitation } from '../aggregates/organization-invitation.aggregate';
import type { OrganizationUuid } from '../value-objects/organization-uuid.vo';

export interface OrganizationInvitationCommandRepository {
  save(invitation: OrganizationInvitation): Promise<void>;
  existsPendingInvitation(input: {
    organizationId: OrganizationUuid;
    inviteeUserId: UserUuid;
  }): Promise<boolean>;
}
