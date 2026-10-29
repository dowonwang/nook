import {
  OrganizationInvitationAggregate,
  type OrganizationCommandRepository,
  type OrganizationInvitationCommandRepository,
} from '$modules/organization/domain';
import {
  OrganizationDuplicateInviteeUserError,
  OrganizationInviteeUserNotFoundError,
  OrganizationAccessDeniedError,
  OrganizationNotFoundError,
  OrganizationPendingInvitationExistError,
  OrganizationSelfInvitationError,
} from '$modules/organization/error';
import { createLogger } from '$shared/logger';

import { CreateInvitationCommand } from './command';

import type { UserQueryRepository } from '$modules/user/domain';
import type { CreateInvitationInput } from './command';

export class CreateInvitationHandler {
  private readonly logger = createLogger(CreateInvitationHandler.name);

  constructor(
    private readonly organizationCommandRepository: OrganizationCommandRepository,
    private readonly organizationInvitationCommandRepository: OrganizationInvitationCommandRepository,
    private readonly userQueryRepository: UserQueryRepository,
  ) {}

  async execute(input: CreateInvitationInput): Promise<void> {
    const command = new CreateInvitationCommand(input);

    const organization =
      await this.organizationCommandRepository.findOrganizationById(
        command.organizationId,
      );

    if (!organization) {
      throw new OrganizationNotFoundError(CreateInvitationHandler.name);
    }

    const inviter = organization.getMemberByUserId(command.inviterUserId);

    if (!inviter || !inviter.canInviteAs(command.invitee.role)) {
      throw new OrganizationAccessDeniedError(CreateInvitationHandler.name);
    }

    const inviteeUser = await this.userQueryRepository.findByEmail(
      command.invitee.email,
    );

    if (!inviteeUser) {
      throw new OrganizationInviteeUserNotFoundError(
        CreateInvitationHandler.name,
      );
    }

    if (command.inviterUserId.equals(inviteeUser.id)) {
      throw new OrganizationSelfInvitationError(CreateInvitationHandler.name);
    }

    if (organization.hasMember(inviteeUser.id)) {
      throw new OrganizationDuplicateInviteeUserError(
        CreateInvitationHandler.name,
      );
    }

    const existsActiveInvitation =
      await this.organizationInvitationCommandRepository.existsActiveInvitation(
        {
          organizationId: command.organizationId,
          inviteeUserId: inviteeUser.id,
        },
      );

    if (existsActiveInvitation) {
      throw new OrganizationPendingInvitationExistError(
        CreateInvitationHandler.name,
      );
    }

    const invitation = OrganizationInvitationAggregate.create(
      command.invitee.invitationId,
      {
        organizationId: command.organizationId,
        inviteeUserId: inviteeUser.id,
        invitedByUserId: inviter.userId,
        role: command.invitee.role,
        expiresAt: this.createExpiresAt(),
      },
    );

    await this.organizationInvitationCommandRepository.save(invitation);

    this.logger.debug(
      {
        details: {
          organizationId: command.organizationId.getValue(),
          invitationId: invitation.id.getValue(),
          inviteeUserId: inviteeUser.id.getValue(),
        },
      },
      'Organization invitation created',
    );
  }

  private createExpiresAt(): Date {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    return expiresAt;
  }
}
