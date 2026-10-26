import type { UserUuidVo } from '$modules/user/domain';
import type { OrganizationInvitationAggregate } from '../aggregates/invitation';
import type { OrganizationInvitationUuidVo } from '../value-objects/invitation-uuid';
import type { OrganizationUuidVo } from '../value-objects/uuid';

export interface OrganizationInvitationCommandRepository {
  save(invitation: OrganizationInvitationAggregate): Promise<void>;
  findById(
    id: OrganizationInvitationUuidVo,
  ): Promise<OrganizationInvitationAggregate | null>;
  existsPendingInvitation(input: {
    organizationId: OrganizationUuidVo;
    inviteeUserId: UserUuidVo;
  }): Promise<boolean>;
}
