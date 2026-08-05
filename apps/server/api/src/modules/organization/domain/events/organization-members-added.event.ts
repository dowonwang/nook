import type { DomainEvent } from '$shared/ddd';
import type { OrganizationMember } from '../entities/organization-member.entity';
import type { OrganizationUuid } from '../value-objects/organization-uuid.vo';

export class OrganizationMembersAddedEvent implements DomainEvent {
  readonly occurredAt: Date = new Date();

  constructor(
    public readonly organizationId: OrganizationUuid,
    public readonly members: readonly OrganizationMember[],
  ) {}
}
