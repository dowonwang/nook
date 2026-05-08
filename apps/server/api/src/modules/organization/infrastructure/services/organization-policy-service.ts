import { DuplicateOrganizationTitle } from '$modules/organization/errors/duplicate-organization-title.error';

import type { OrganizationQueryRepository } from '$modules/organization/domain/repositories/organization-query.repository';
import type { OrganizationPolicy } from '$modules/organization/domain/services/organization-policy';

export class OrganizationPolicyService implements OrganizationPolicy {
  constructor(
    private readonly organizationQueryRepository: OrganizationQueryRepository,
  ) {}

  async assertCreatableTitleByUser(
    userId: string,
    title: string,
  ): Promise<void> {
    const exist =
      await this.organizationQueryRepository.findOrganizationIdByUserIdAndTitle(
        userId,
        title,
      );

    if (exist) {
      throw new DuplicateOrganizationTitle(OrganizationPolicyService.name);
    }
  }
}
