import {
  OrganizationInvitationAggregate,
  OrganizationInvitationStatusVo,
  OrganizationInvitationUuidVo,
  OrganizationMemberRoleVo,
  OrganizationUuidVo,
} from '$modules/organization/domain';
import { UserUuidVo } from '$modules/user/domain';

import type { OrganizationInvitation as PrismaOrganizationInvitation } from '@packages/api-db';

export const OrganizationInvitationPrismaMapper = {
  toInvitationDomain(
    record: PrismaOrganizationInvitation,
  ): OrganizationInvitationAggregate {
    return OrganizationInvitationAggregate.reconstruct(
      OrganizationInvitationUuidVo.create(record.id),
      {
        organizationId: OrganizationUuidVo.create(record.organizationId),
        inviteeUserId: UserUuidVo.create(record.inviteeUserId),
        invitedByUserId: UserUuidVo.create(record.invitedByUserId),
        role: OrganizationMemberRoleVo.create(record.role),
        status: OrganizationInvitationStatusVo.create(record.status),
        expiresAt: record.expiresAt,
      },
    );
  },
};
