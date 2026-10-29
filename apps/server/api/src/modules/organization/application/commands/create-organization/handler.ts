import {
  OrganizationAggregate,
  OrganizationMemberEntity,
  OrganizationMemberRoleVo,
  OrganizationMemberUuidVo,
  OrganizationSlugVo,
  OrganizationUuidVo,
} from '$modules/organization/domain';
import { DuplicateOrganizationSlugError } from '$modules/organization/error';

import { CreateOrganizationCommand } from './command';

import type { OrganizationCommandRepository } from '$modules/organization/domain';
import type {
  CreateOrganizationInput,
  CreateOrganizationResult,
} from './command';

// 생성된 slug가 이미 사용 중일 때 새 slug로 다시 시도하는 최대 횟수
const MAX_SLUG_ATTEMPTS = 3;

export class CreateOrganizationHandler {
  constructor(
    private readonly organizationCommandRepository: OrganizationCommandRepository,
  ) {}

  async execute(
    input: CreateOrganizationInput,
  ): Promise<CreateOrganizationResult> {
    const command = new CreateOrganizationCommand(input);

    for (let attempt = 1; ; attempt++) {
      const organization = this.createOrganization(command);

      try {
        await this.organizationCommandRepository.save(organization);
      } catch (error) {
        if (
          error instanceof DuplicateOrganizationSlugError &&
          attempt < MAX_SLUG_ATTEMPTS
        ) {
          continue;
        }

        throw error;
      }

      const { id, title, slug } = organization.toSnapshot();

      return { id, title, slug };
    }
  }

  private createOrganization(
    command: CreateOrganizationCommand,
  ): OrganizationAggregate {
    const organizationId = OrganizationUuidVo.generate();

    const organizationOwner = OrganizationMemberEntity.create(
      OrganizationMemberUuidVo.generate(),
      {
        organizationId,
        userId: command.userId,
        role: OrganizationMemberRoleVo.create('ADMIN'),
      },
    );

    return OrganizationAggregate.create(
      organizationId,
      {
        title: command.title,
        slug: OrganizationSlugVo.generate(),
      },
      [organizationOwner],
    );
  }
}
