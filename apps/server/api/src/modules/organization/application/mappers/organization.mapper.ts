import type { Organization } from '$modules/organization/domain';
import type { UserUuid } from '$modules/user/domain';
import type { UserOrganizationDto } from '../dto/organization.dto';

export const OrganizationDtoMapper = {
  toUserOrganizations(
    userId: UserUuid,
    organizations: Organization[],
  ): UserOrganizationDto[] {
    return organizations
      .map((organization) => {
        const member = organization.getMember(userId);

        if (!member) {
          return null;
        }

        return {
          id: organization.id.getValue(),
          title: organization.title,
          memberCount: organization.getMemberCount(),
          userRole: member.role.getValue(),
        };
      })
      .filter((dto) => dto !== null);
  },
};
