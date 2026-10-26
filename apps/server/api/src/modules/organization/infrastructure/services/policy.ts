import { DuplicateOrganizationTitleError } from '$modules/organization/error';

import type {
  OrganizationPolicyService,
  OrganizationQueryRepository,
} from '$modules/organization/domain';

export class PrismaOrganizationPolicyService implements OrganizationPolicyService {
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
      throw new DuplicateOrganizationTitleError(
        PrismaOrganizationPolicyService.name,
      );
    }
  }
}
