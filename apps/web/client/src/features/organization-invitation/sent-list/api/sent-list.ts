import type {
  OrganizationInvitationInvitee,
  OrganizationSentInvitation,
} from '$entities/organization-invitation';
import type { GetOrganizationByOrganizationIdInvitations200 } from '@packages/api-client/api';

export async function findOrganizationInvitationSentList(
  organizationId: string | undefined,
): Promise<OrganizationSentInvitation[]> {
  if (!organizationId) return [];

  const response = await fetch(
    `/api/organization/${organizationId}/invitations`,
    {
      method: 'GET',
    },
  );

  if (response.ok) {
    const { data } =
      (await response.json()) as GetOrganizationByOrganizationIdInvitations200;

    return data.map((item) => ({
      id: item.id,
      organizationId: item.organizationId,
      invitee: item.invitee as OrganizationInvitationInvitee | null,
      role: item.role,
      expiresAt: new Date(item.expiresAt),
      status: item.status,
    }));
  }

  return [];
}
