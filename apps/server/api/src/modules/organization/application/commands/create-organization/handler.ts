import {
  OrganizationAggregate,
  OrganizationMemberEntity,
  OrganizationMemberRoleVo,
  OrganizationMemberUuidVo,
  OrganizationUuidVo,
} from '$modules/organization/domain';

import { CreateOrganizationCommand } from './command';

import type {
  OrganizationCommandRepository,
  OrganizationPolicyService,
} from '$modules/organization/domain';
import type {
  CreateOrganizationInput,
  CreateOrganizationResult,
} from './command';

export class CreateOrganizationHandler {
  constructor(
    private readonly organizationPolicy: OrganizationPolicyService,
    private readonly organizationCommandRepository: OrganizationCommandRepository,
  ) {}

  async execute(
    input: CreateOrganizationInput,
  ): Promise<CreateOrganizationResult> {
    const command = new CreateOrganizationCommand(input);
    const userId = command.userId;
    const organizationId = OrganizationUuidVo.generate();

    const organizationOwner = OrganizationMemberEntity.create(
      OrganizationMemberUuidVo.generate(),
      {
        organizationId,
        userId,
        role: OrganizationMemberRoleVo.create('ADMIN'),
      },
    );

    const organization = OrganizationAggregate.create(
      organizationId,
      {
        title: command.title,
      },
      [organizationOwner],
    );

    await this.organizationPolicy.assertCreatableTitleByUser(
      userId.getValue(),
      organization.title,
    );

    await this.organizationCommandRepository.save(organization);

    return { id: organization.id.getValue(), title: organization.title };
  }
}
