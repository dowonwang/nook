import type { Organization } from '../entities/organization.entity';

export interface OrganizationCommandRepository {
  save(organization: Organization): Promise<void>;
  findOrganizationById(id: string): Promise<Organization | null>;
}
