import { FindReceivedInvitationsQuery } from './query';
import { OrganizationInvitationDtoMapper } from '../../mappers/invitation';

import type { UserQueryRepository } from '$modules/user/domain';
import type {
  OffsetPagination,
  OffsetPaginationResult,
} from '$shared/pagination';
import type { FindReceivedInvitationsInput } from './query';
import type { OrganizationReceivedInvitationDto } from '../../dto/invitation';
import type { OrganizationInvitationReaderPort } from '../../ports/invitation-reader';
import type { OrganizationReaderPort } from '../../ports/reader';

export class FindReceivedInvitationsHandler {
  constructor(
    private readonly organizationInvitationReader: OrganizationInvitationReaderPort,
    private readonly organizationReader: OrganizationReaderPort,
    private readonly userQueryRepository: UserQueryRepository,
  ) {}

  async execute(
    input: FindReceivedInvitationsInput,
    pagination: OffsetPagination,
  ): Promise<{
    response: OrganizationReceivedInvitationDto[];
    paginationResult: OffsetPaginationResult;
  }> {
    const query = new FindReceivedInvitationsQuery(input);

    const { invitations, paginationResult } =
      await this.organizationInvitationReader.findReceivedInvitations(
        {
          userId: query.userId,
        },
        pagination,
      );

    const organizationIds = invitations.map(
      (invitation) => invitation.organizationId,
    );
    const inviterIds = invitations.map(
      (invitation) => invitation.invitedByUserId,
    );

    const organizations = await this.organizationReader.findManyByIds({
      organizationIds,
    });

    const inviters = await this.userQueryRepository.findManyByIds(inviterIds);

    return {
      response: OrganizationInvitationDtoMapper.toReceivedList(
        invitations,
        organizations,
        inviters,
      ),
      paginationResult,
    };
  }
}
