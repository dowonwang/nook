import type { OrganizationAggregate } from '$modules/organization/domain';
import type { UserUuidVo } from '$modules/user/domain';
import type { UserOrganizationDto } from '../dto/organization';

export const OrganizationDtoMapper = {
  toUserOrganizations(
    userId: UserUuidVo,
    organizations: OrganizationAggregate[],
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
