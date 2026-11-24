import type { OrganizationUserReaderPort } from '$modules/organization/application';
import type { UserQueryRepository, UserUuidVo } from '$modules/user/domain';

export class UserModuleOrganizationUserReaderAdapter implements OrganizationUserReaderPort {
  constructor(private readonly userQueryRepository: UserQueryRepository) {}

  async existsById(userId: UserUuidVo): Promise<boolean> {
    const user = await this.userQueryRepository.findById(userId);

    return user !== null;
  }
}
