import type { Organization } from '$modules/organization/domain/entities/organization.entity';

export interface OrganizationCommandRepository {
  save(organization: Organization): Promise<void>;
  findOrganizationById(id: string): Promise<Organization | null>;
}
