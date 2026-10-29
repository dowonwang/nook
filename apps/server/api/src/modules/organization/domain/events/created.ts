import type { DomainEvent } from '$shared/ddd';
import type { OrganizationSlugVo } from '../value-objects/slug';
import type { OrganizationUuidVo } from '../value-objects/uuid';

export class OrganizationCreatedEvent implements DomainEvent {
  readonly occurredAt: Date = new Date();

  constructor(
    public readonly id: OrganizationUuidVo,
    public readonly title: string,
    public readonly slug: OrganizationSlugVo,
  ) {}
}
