import type {
  Organization,
  OrganizationInvitation,
} from '$modules/organization/domain';
import type { User } from '$modules/user/domain';
import type {
  OrganizationReceivedInvitationDto,
  OrganizationSentInvitationDto,
} from '../dto/organization-invitation.dto';

export const OrganizationInvitationDtoMapper = {
  toSentList(
    invitations: OrganizationInvitation[],
    invitees: User[],
  ): OrganizationSentInvitationDto[] {
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

  toReceivedList(
    invitations: OrganizationInvitation[],
    organization: Organization[],
    inviters: User[],
  ): OrganizationReceivedInvitationDto[] {
    const organizationById = new Map(
      organization.map((organization) => {
        const snapshot = organization.toSnapshot();

        return [snapshot.id, snapshot];
      }),
    );

    const inviterById = new Map(
      inviters.map((inviter) => [inviter.id.getValue(), inviter]),
    );

    return invitations.map((invitation) => {
      const invitationSnapshot = invitation.toSnapshot();
      const organization = organizationById.get(
        invitationSnapshot.organizationId,
      );
      const inviter = inviterById.get(invitationSnapshot.invitedByUserId);
      const inviterSnapshot = inviter ? inviter.toSnapshot() : null;

      return {
        id: invitationSnapshot.id,
        organization: {
          id: organization?.id ?? invitationSnapshot.organizationId,
          title: organization?.title ?? '삭제된 조직',
        },
        invitedBy: inviterSnapshot
          ? {
              id: inviterSnapshot.id,
              email: inviterSnapshot.email,
              name: inviterSnapshot.name,
            }
          : null,
        role: invitationSnapshot.role,
        status: invitationSnapshot.status,
        expiresAt: invitationSnapshot.expiresAt.toISOString(),
      };
    });
  },
};
