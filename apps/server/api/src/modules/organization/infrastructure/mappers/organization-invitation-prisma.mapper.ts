import {
  OrganizationInvitation,
  OrganizationInvitationStatus,
  OrganizationInvitationUuid,
  OrganizationMemberRole,
  OrganizationUuid,
} from '$modules/organization/domain';
import { UserUuid } from '$modules/user/domain';

import type { OrganizationInvitation as PrismaOrganizationInvitation } from '@packages/api-db';

export const OrganizationInvitationPrismaMapper = {
  toInvitationDomain(
    record: PrismaOrganizationInvitation,
  ): OrganizationInvitation {
    return OrganizationInvitation.reconstruct(
      OrganizationInvitationUuid.create(record.id),
      {
        organizationId: OrganizationUuid.create(record.organizationId),
        inviteeUserId: UserUuid.create(record.inviteeUserId),
        invitedByUserId: UserUuid.create(record.invitedByUserId),
        role: OrganizationMemberRole.create(record.role),
        status: OrganizationInvitationStatus.create(record.status),
        expiresAt: record.expiresAt,
      },
    );
  },
};
