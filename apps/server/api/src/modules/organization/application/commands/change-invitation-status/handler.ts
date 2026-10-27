import {
  InvalidOrganizationInvitationStatusError,
  OrganizationInvitationNotFoundError,
  OrganizationNotFoundError,
} from '$modules/organization/error';

import { ChangeInvitationStatusCommand } from './command';

import type {
  OrganizationCommandRepository,
  OrganizationInvitationAggregate,
  OrganizationInvitationCommandRepository,
} from '$modules/organization/domain';
import type { TransactionManager } from '$shared/database';
import type { ChangeInvitationStatusInput } from './command';

export class ChangeInvitationStatusHandler {
  constructor(
    private readonly organizationInvitationCommandRepository: OrganizationInvitationCommandRepository,
    private readonly organizationCommandRepository: OrganizationCommandRepository,
    private readonly transactionManager: TransactionManager,
  ) {}

  async execute(input: ChangeInvitationStatusInput) {
    const command = new ChangeInvitationStatusCommand(input);

    const invitation =
      await this.organizationInvitationCommandRepository.findById(
        command.organizationInvitationId,
      );

    if (!invitation) {
      throw new OrganizationInvitationNotFoundError(
        ChangeInvitationStatusHandler.name,
      );
    }

    const organization =
      await this.organizationCommandRepository.findOrganizationById(
        invitation.organizationId,
      );

    if (!organization) {
      throw new OrganizationNotFoundError(ChangeInvitationStatusHandler.name);
    }

    switch (command.status.getValue()) {
      case 'ACCEPTED':
        invitation.accept(command.userId);
        organization.addMemberFromInvitation(
          invitation.inviteeUserId,
          invitation.role,
        );

        // 상태 변경에 실패하면 트랜잭션이 롤백되어 멤버도 추가되지 않음
        await this.transactionManager.run(async () => {
          await this.updateStatusIfPending(invitation);
          await this.organizationCommandRepository.save(organization);
        });
        break;

      case 'CANCELED':
        invitation.cancel(command.userId);
        await this.updateStatusIfPending(invitation);
        break;

      case 'REJECTED':
        invitation.reject(command.userId);
        await this.updateStatusIfPending(invitation);
        break;

      case 'PENDING':
        invitation.assertPending();
        break;

      default:
        throw new InvalidOrganizationInvitationStatusError(
          ChangeInvitationStatusHandler.name,
        );
    }
  }

  // 조회 이후 다른 요청이 먼저 상태를 바꿨다면 반영하지 않고 실패 처리
  private async updateStatusIfPending(
    invitation: OrganizationInvitationAggregate,
  ): Promise<void> {
    const updated =
      await this.organizationInvitationCommandRepository.updateStatusIfPending(
        invitation,
      );

    if (!updated) {
      throw new InvalidOrganizationInvitationStatusError(
        ChangeInvitationStatusHandler.name,
      );
    }
  }
}
