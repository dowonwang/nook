import { FindReceivedInvitationsQuery } from './find-received-invitations.query';
import { OrganizationInvitationDtoMapper } from '../../mappers/organization-invitation.mapper';

import type { UserQueryRepository } from '$modules/user/domain';
import type { FindReceivedInvitationsInput } from './find-received-invitations.query';
import type { OrganizationReceivedInvitationDto } from '../../dto/organization-invitation.dto';
import type { OrganizationInvitationReader } from '../../ports/organization-invitation-reader.port';
import type { OrganizationReader } from '../../ports/organization-reader.port';

export class FindReceivedInvitationsHandler {
  constructor(
    private readonly organizationInvitationReader: OrganizationInvitationReader,
    private readonly organizationReader: OrganizationReader,
    private readonly userQueryRepository: UserQueryRepository,
  ) {}

  async execute(
    input: FindReceivedInvitationsInput,
  ): Promise<OrganizationReceivedInvitationDto[]> {
    const query = new FindReceivedInvitationsQuery(input);

    const invitations =
      await this.organizationInvitationReader.findReceivedInvitations({
        userId: query.userId,
      });

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

    return OrganizationInvitationDtoMapper.toReceivedList(
      invitations,
      organizations,
      inviters,
    );
  }
}
