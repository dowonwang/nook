import { createLogger } from '$shared/logger';

import { FindUserOrganizationsQuery } from './find-user-organizations.query';
import { OrganizationDtoMapper } from '../../mappers/organization.mapper';

import type { FindUserOrganizationsInput } from './find-user-organizations.query';
import type { OrganizationReader } from '../../ports/organization-reader.port';

export class FindUserOrganizationsHandler {
  private readonly logger = createLogger(FindUserOrganizationsHandler.name);

  constructor(private readonly organizationReader: OrganizationReader) {}

  async execute(input: FindUserOrganizationsInput) {
    const query = new FindUserOrganizationsQuery(input);

    const organizations = await this.organizationReader.findUserOrganizations({
      userId: query.userId,
    });

    this.logger.debug(
      {
        details: {
          userId: query.userId.getValue(),
        },
      },
      'User Organization select',
    );

    return OrganizationDtoMapper.toUserOrganizations(
      query.userId,
      organizations,
    );
  }
}
