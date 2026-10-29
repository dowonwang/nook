import type { UserUuidVo } from '$modules/user/domain';
import type { OrganizationInvitationAggregate } from '../aggregates/invitation';
import type { OrganizationInvitationUuidVo } from '../value-objects/invitation-uuid';
import type { OrganizationUuidVo } from '../value-objects/uuid';

export interface OrganizationInvitationCommandRepository {
  save(invitation: OrganizationInvitationAggregate): Promise<void>;
  // 저장소의 초대가 아직 PENDING일 때만 상태를 반영하고, 반영 여부를 반환
  updateStatusIfPending(
    invitation: OrganizationInvitationAggregate,
  ): Promise<boolean>;
  findById(
    id: OrganizationInvitationUuidVo,
  ): Promise<OrganizationInvitationAggregate | null>;
  // 대기 중이면서 아직 만료되지 않은 초대가 있는지 확인
  existsActiveInvitation(input: {
    organizationId: OrganizationUuidVo;
    inviteeUserId: UserUuidVo;
  }): Promise<boolean>;
}
