import type { OrganizationAggregate } from '$modules/organization/domain';
import type { UserUuidVo } from '$modules/user/domain';
import type { UserOrganizationDto } from '../dto/organization';

export const OrganizationDtoMapper = {
  // 사용자가 소속되지 않은 조직이면 null
  toUserOrganization(
    userId: UserUuidVo,
    organization: OrganizationAggregate,
  ): UserOrganizationDto | null {
    const member = organization.getMemberByUserId(userId);

    if (!member) {
      return null;
    }

    const { id, title, slug } = organization.toSnapshot();

    return {
      id,
      title,
      slug,
      memberCount: organization.getMemberCount(),
      userRole: member.role.getValue(),
    };
  },

  toUserOrganizations(
    userId: UserUuidVo,
    organizations: OrganizationAggregate[],
  ): UserOrganizationDto[] {
    return organizations
      .map((organization) =>
        OrganizationDtoMapper.toUserOrganization(userId, organization),
      )
      .filter((dto) => dto !== null);
  },
};
