import {
  Organization,
  OrganizationMember,
  OrganizationMemberUuid,
  OrganizationUuid,
  type OrganizationCommandRepository,
  type OrganizationPolicy,
} from '$modules/organization/domain';
import { UserUuid } from '$modules/user/domain';

import type { CreateCommnad } from './create.command';

export class CreateHandler {
  constructor(
    private readonly organizationPolicy: OrganizationPolicy,
    private readonly organizationCommandRepository: OrganizationCommandRepository,
  ) {}

  async execute(command: CreateCommnad): Promise<{ id: string }> {
    const userId = UserUuid.create(command.userId);
    const organizationId = OrganizationUuid.generate();

    const organizationOwner = OrganizationMember.create(
      OrganizationMemberUuid.generate(),
      {
        organizationId,
        userId,
        role: 'ADMIN',
      },
    );

    const organization = Organization.create(
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

    return { id: organization.id.getValue() };
  }
}
