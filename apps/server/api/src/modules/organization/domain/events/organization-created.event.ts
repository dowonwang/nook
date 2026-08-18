import type { DomainEvent } from '$shared/ddd';
import type { OrganizationUuid } from '../value-objects/organization-uuid.vo';

export class OrganizationCreatedEvent implements DomainEvent {
  readonly occurredAt: Date = new Date();

  constructor(
    public readonly id: OrganizationUuid,
    public readonly title: string,
  ) {}
}
