import type {
  OrganizationInvitationInvitedBy,
  OrganizationReceivedInvitation,
} from '$entities/organization-invitation';
import type { GetOrganizationInvitations200 } from '@packages/api-client/api';

export async function getReceivedOrganizationInvitations(): Promise<
  OrganizationReceivedInvitation[]
> {
  const response = await fetch('/api/organization/invitations', {
    method: 'GET',
  });

  if (response.ok) {
    const { data } = (await response.json()) as GetOrganizationInvitations200;

    return data.map((item) => ({
      id: item.id,
      organization: item.organization,
      invitedBy: item.invitedBy as OrganizationInvitationInvitedBy | null,
      role: item.role,
      status: item.status,
      expiresAt: item.expiresAt,
    }));
  }

  return [];
}
