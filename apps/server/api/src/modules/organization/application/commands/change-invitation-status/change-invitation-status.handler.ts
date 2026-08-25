import {
  InvalidOrganizationInvitationStatus,
  OrganizationInvitationNotFound,
  OrganizationNotFound,
} from '$modules/organization/error';

import { ChangeInvitationStatusCommand } from './change-invitation-status.command';

import type {
  OrganizationCommandRepository,
  OrganizationInvitationCommandRepository,
} from '$modules/organization/domain';
import type { TransactionManager } from '$shared/database';
import type { ChangeInvitationStatusInput } from './change-invitation-status.command';

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
      throw new OrganizationInvitationNotFound(
        ChangeInvitationStatusHandler.name,
      );
    }

    const organization =
      await this.organizationCommandRepository.findOrganizationById(
        invitation.organizationId,
      );

    if (!organization) {
      throw new OrganizationNotFound(ChangeInvitationStatusHandler.name);
    }

    switch (command.status.getValue()) {
      case 'ACCEPTED':
        invitation.accept(command.userId);
        organization.addMemberFromInvitation(
          invitation.inviteeUserId,
          invitation.role,
        );

        await this.transactionManager.run(async () => {
          await this.organizationInvitationCommandRepository.save(invitation);
          await this.organizationCommandRepository.save(organization);
        });
        break;

      case 'CANCELED':
        invitation.cancel(command.userId);
        await this.organizationInvitationCommandRepository.save(invitation);
        break;

      case 'REJECTED':
        invitation.reject(command.userId);
        await this.organizationInvitationCommandRepository.save(invitation);
        break;

      case 'PENDING':
        invitation.assertPending();
        break;

      default:
        throw new InvalidOrganizationInvitationStatus(
          ChangeInvitationStatusHandler.name,
        );
    }
  }
}
