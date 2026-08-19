import type { Organization } from '../aggregates/organization.aggregate';
import type { OrganizationUuid } from '../value-objects/organization-uuid.vo';

export interface OrganizationCommandRepository {
  save(organization: Organization): Promise<void>;
  findOrganizationById(id: OrganizationUuid): Promise<Organization | null>;
}
