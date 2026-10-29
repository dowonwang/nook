import type { OrganizationAggregate } from '../aggregates/organization';
import type { OrganizationUuidVo } from '../value-objects/uuid';

export interface OrganizationCommandRepository {
  save(organization: OrganizationAggregate): Promise<void>;
  findOrganizationById(
    id: OrganizationUuidVo,
  ): Promise<OrganizationAggregate | null>;
}
