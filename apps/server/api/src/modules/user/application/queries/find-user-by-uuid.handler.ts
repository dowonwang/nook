import { UserDtoMapper } from '../mapper/user-dto.mapper';

import type { UserQueryRepository } from '$modules/user/domain';
import type { FindUserByUuidQuery } from './find-user-by-uuid.query';
import type { UserDetailDto } from '../dto/user-detail.dto';

export class FindUserByUuidHandler {
  constructor(private readonly userQueryRepository: UserQueryRepository) {}

  async execute(query: FindUserByUuidQuery): Promise<UserDetailDto | null> {
    const user = await this.userQueryRepository.findById(query.id);

    return user ? UserDtoMapper.fromEntity(user) : null;
  }
}
