import type { Organization } from '$modules/organization/domain';
import type { UserUuid } from '$modules/user/domain';

export interface OrganizationReader {
  findUserOrganizations(params: { userId: UserUuid }): Promise<Organization[]>;
}
