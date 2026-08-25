import {
  OrganizationInvitation,
  type OrganizationCommandRepository,
} from '$modules/organization/domain';
import {
  DuplicateInviteeUser,
  InviteeUserNotFound,
  OrganizationAccessDenied,
  OrganizationNotFound,
  PendingInvitationExist,
  SelfInvitation,
} from '$modules/organization/error';
import { createLogger } from '$shared/logger';

import { CreateInvitationCommand } from './create-invitation.command';

import type { OrganizationInvitationCommandRepository } from '$modules/organization/domain/repositories/organization-invitation-command.repository';
import type { UserQueryRepository } from '$modules/user/domain';
import type { CreateInvitationInput } from './create-invitation.command';

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
      throw new OrganizationNotFound(CreateInvitationHandler.name);
    }

    const inviter = organization.getMember(command.inviterUserId);

    if (!inviter || !inviter.canAddMember()) {
      throw new OrganizationAccessDenied(CreateInvitationHandler.name);
    }

    const inviteeUser = await this.userQueryRepository.findByEmail(
      command.invitee.email,
    );

    if (!inviteeUser) {
      throw new InviteeUserNotFound(CreateInvitationHandler.name);
    }

    if (command.inviterUserId.equals(inviteeUser.id)) {
      throw new SelfInvitation(CreateInvitationHandler.name);
    }

    if (organization.hasMember(inviteeUser.id)) {
      throw new DuplicateInviteeUser(CreateInvitationHandler.name);
    }

    const existsPendingInvitation =
      await this.organizationInvitationCommandRepository.existsPendingInvitation(
        {
          organizationId: command.organizationId,
          inviteeUserId: inviteeUser.id,
        },
      );

    if (existsPendingInvitation) {
      throw new PendingInvitationExist(CreateInvitationHandler.name);
    }

    const invitation = OrganizationInvitation.create(
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
