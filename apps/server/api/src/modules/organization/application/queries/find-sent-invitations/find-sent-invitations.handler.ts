import {
  OrganizationAccessDenied,
  OrganizationNotFound,
} from '$modules/organization/error';

import { FindSentInvitationsQuery } from './find-sent-invitations.query';
import { OrganizationInvitationDtoMapper } from '../../mappers/organization-invitation.mapper';

import type { OrganizationCommandRepository } from '$modules/organization/domain';
import type { UserQueryRepository } from '$modules/user/domain';
import type { OffsetPagination } from '$shared/pagination';
import type { FindSentInvitationsInput } from './find-sent-invitations.query';
import type { OrganizationInvitationReader } from '../../ports/organization-invitation-reader.port';

export class FindSentInvitationsHandler {
  constructor(
    private readonly organizationCommandRepository: OrganizationCommandRepository,
    private readonly organizationInvitationReader: OrganizationInvitationReader,
    private readonly userQueryRepository: UserQueryRepository,
  ) {}

  async execute(input: FindSentInvitationsInput, pagination: OffsetPagination) {
    const query = new FindSentInvitationsQuery(input);

    const organization =
      await this.organizationCommandRepository.findOrganizationById(
        query.organizationId,
      );

    if (!organization) {
      throw new OrganizationNotFound(FindSentInvitationsHandler.name);
    }

    const requester = organization.getMember(query.userId);

    if (!requester || !requester.canAddMember()) {
      throw new OrganizationAccessDenied(FindSentInvitationsHandler.name);
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
