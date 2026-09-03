import type {
  Organization,
  OrganizationUuid,
} from '$modules/organization/domain';
import type { UserUuid } from '$modules/user/domain';

export interface OrganizationReader {
  findUserOrganizations(params: { userId: UserUuid }): Promise<Organization[]>;
  findManyByIds(params: {
    organizationIds: OrganizationUuid[];
  }): Promise<Organization[]>;
}
