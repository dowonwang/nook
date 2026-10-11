import { createLogger } from '$shared/logger';

import { FindUserOrganizationsQuery } from './find-user-organizations.query';
import { OrganizationDtoMapper } from '../../mappers/organization.mapper';

import type { OffsetPagination } from '$shared/pagination';
import type { FindUserOrganizationsInput } from './find-user-organizations.query';
import type { OrganizationReader } from '../../ports/organization-reader.port';

export class FindUserOrganizationsHandler {
  private readonly logger = createLogger(FindUserOrganizationsHandler.name);

  constructor(private readonly organizationReader: OrganizationReader) {}

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
