import type { OrganizationUuid } from '$modules/organization/domain/value-objects/organization-uuid.vo';
import type { DomainEvent } from '$shared/ddd/entity/aggregate-root.abstract';

export class OrganizationCreatededEvent implements DomainEvent {
  readonly occurredAt: Date = new Date();

  constructor(
    public readonly id: OrganizationUuid,
    public readonly title: string,
  ) {}
}
