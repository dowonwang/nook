import { FindUserOrganizationsQuery } from './find-user-organizations.query';
import { OrganizationDtoMapper } from '../../mappers/organization.mapper';

import type { FindUserOrganizationsInput } from './find-user-organizations.query';
import type { OrganizationReader } from '../../ports/organization-reader.port';

export class FindUserOrganizationsHandler {
  constructor(private readonly organizationReader: OrganizationReader) {}

  async execute(input: FindUserOrganizationsInput) {
    const query = new FindUserOrganizationsQuery(input);

    const organizations = await this.organizationReader.findUserOrganizations({
      userId: query.userId,
    });

    return OrganizationDtoMapper.toUserOrganizations(
      query.userId,
      organizations,
    );
  }
}
