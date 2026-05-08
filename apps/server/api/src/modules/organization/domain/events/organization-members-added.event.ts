import type { OrganizationMember } from '$modules/organization/domain/entities/organization-member.entity';
import type { OrganizationUuid } from '$modules/organization/domain/value-objects/organization-uuid.vo';
import type { DomainEvent } from '$shared/ddd/entity/aggregate-root.abstract';

export class OrganizationMembersAddedEvent implements DomainEvent {
  readonly occurredAt: Date = new Date();

  constructor(
    public readonly organizationId: OrganizationUuid,
    public readonly members: readonly OrganizationMember[],
  ) {}
}
