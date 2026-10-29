import {
  OrganizationAccessDeniedError,
  OrganizationNotFoundError,
} from '$modules/organization/error';

import { FindSentInvitationsQuery } from './query';
import { OrganizationInvitationDtoMapper } from '../../mappers/invitation';

import type { OrganizationCommandRepository } from '$modules/organization/domain';
import type { UserQueryRepository } from '$modules/user/domain';
import type { OffsetPagination } from '$shared/pagination';
import type { FindSentInvitationsInput } from './query';
import type { OrganizationInvitationReaderPort } from '../../ports/invitation-reader';

export class FindSentInvitationsHandler {
  constructor(
    private readonly organizationCommandRepository: OrganizationCommandRepository,
    private readonly organizationInvitationReader: OrganizationInvitationReaderPort,
    private readonly userQueryRepository: UserQueryRepository,
  ) {}

  async execute(input: FindSentInvitationsInput, pagination: OffsetPagination) {
    const query = new FindSentInvitationsQuery(input);

    const organization =
      await this.organizationCommandRepository.findOrganizationById(
        query.organizationId,
      );

    if (!organization) {
      throw new OrganizationNotFoundError(FindSentInvitationsHandler.name);
    }

    const requester = organization.getMemberByUserId(query.userId);

    if (!requester || !requester.canAddMember()) {
      throw new OrganizationAccessDeniedError(FindSentInvitationsHandler.name);
    }

    const { invitations, paginationResult } =
      await this.organizationInvitationReader.findSentInvitations(
        {
          organizationId: organization.id,
          invitedByUserId: requester.userId,
        },
        pagination,
      );

    const inviteeUserIds = invitations.map(
      (invitation) => invitation.inviteeUserId,
    );

    const invitees =
      await this.userQueryRepository.findManyByIds(inviteeUserIds);

    return {
      response: OrganizationInvitationDtoMapper.toSentList(
        invitations,
        invitees,
      ),
      paginationResult,
    };
  }
}
