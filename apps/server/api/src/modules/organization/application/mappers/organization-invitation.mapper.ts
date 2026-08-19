import type { OrganizationInvitation } from '$modules/organization/domain';
import type { User } from '$modules/user/domain';
import type { OrganizationInvitationDto } from '../dto/organization-invitation.dto';

export const OrganizationInvitationDtoMapper = {
  fromModels(
    invitations: OrganizationInvitation[],
    invitees: User[],
  ): OrganizationInvitationDto[] {
    const inviteeById = new Map(
      invitees.map((invitee) => [invitee.id.getValue(), invitee]),
    );

    return invitations.map((invitation) => {
      const invitee = inviteeById.get(invitation.inviteeUserId.getValue());
      const invitationSnapshot = invitation.toSnapshot();
      const inviteeSnapshot = invitee ? invitee.toSnapshot() : null;

      return {
        id: invitationSnapshot.id,
        organizationId: invitationSnapshot.organizationId,
        role: invitationSnapshot.role,
        status: invitationSnapshot.status,
        expiresAt: invitationSnapshot.expiresAt.toISOString(),
        invitee: inviteeSnapshot
          ? {
              id: inviteeSnapshot.id,
              email: inviteeSnapshot.email,
              name: inviteeSnapshot.name,
            }
          : null,
      };
    });
  },
};
