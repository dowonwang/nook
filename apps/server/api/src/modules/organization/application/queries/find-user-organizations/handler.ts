import { createLogger } from '$shared/logger';

import { FindUserOrganizationsQuery } from './query';
import { OrganizationDtoMapper } from '../../mappers/organization';

import type { OffsetPagination } from '$shared/pagination';
import type { FindUserOrganizationsInput } from './query';
import type { OrganizationReaderPort } from '../../ports/reader';

export class FindUserOrganizationsHandler {
  private readonly logger = createLogger(FindUserOrganizationsHandler.name);

  constructor(private readonly organizationReader: OrganizationReaderPort) {}

  async execute(
    input: FindUserOrganizationsInput,
    pagination: OffsetPagination,
  ) {
    const query = new FindUserOrganizationsQuery(input);

    const { organizations, paginationResult } =
      await this.organizationReader.findUserOrganizations(
        {
          userId: query.userId,
        },
        pagination,
      );

    this.logger.debug(
      {
        details: {
          userId: query.userId.getValue(),
        },
      },
      'User Organization select',
    );

    return {
      response: OrganizationDtoMapper.toUserOrganizations(
        query.userId,
        organizations,
      ),
      paginationResult: paginationResult,
    };
  }
}
