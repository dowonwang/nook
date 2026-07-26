import { DuplicateOrganizationTitle } from '$modules/organization/error';

import type {
  OrganizationPolicy,
  OrganizationQueryRepository,
} from '$modules/organization/domain';

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
