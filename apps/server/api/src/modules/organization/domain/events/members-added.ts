import type { DomainEvent } from '$shared/ddd';
import type { OrganizationMemberEntity } from '../entities/member';
import type { OrganizationUuidVo } from '../value-objects/uuid';

export class OrganizationMembersAddedEvent implements DomainEvent {
  readonly occurredAt: Date = new Date();

  constructor(
    public readonly organizationId: OrganizationUuidVo,
    public readonly members: readonly OrganizationMemberEntity[],
  ) {}
}
