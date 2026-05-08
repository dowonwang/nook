import { OrganizationMember } from '$modules/organization/domain/entities/organization-member.entity';
import { Organization } from '$modules/organization/domain/entities/organization.entity';
import { OrganizationMemberUuid } from '$modules/organization/domain/value-objects/organization-member-uuid.vo';
import { OrganizationUuid } from '$modules/organization/domain/value-objects/organization-uuid.vo';
import { UserUuid } from '$modules/user/domain/value-objects/uuid.vo';

import type { OrganizationCommandRepository } from '$modules/organization/domain/repositories/organization-command.repository';
import type { OrganizationPolicy } from '$modules/organization/domain/services/organization-policy';
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
