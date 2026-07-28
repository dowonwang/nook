import { UserDtoMapper, type UserDetailDto } from '$modules/user/application';
import { UserUuid, type UserQueryRepository } from '$modules/user/domain';
import { UserNotFound } from '$modules/user/error';
import { createLogger } from '$shared/logger';

import type { MeQuery } from './me.query';

export class MeHandler {
  private readonly logger = createLogger(MeHandler.name);

  constructor(private readonly userQueryRepository: UserQueryRepository) {}

  async excute(query: MeQuery): Promise<UserDetailDto> {
    const id = UserUuid.create(query.id);

    const user = await this.userQueryRepository.findById(id.getValue());

    if (!user) {
      throw new UserNotFound(MeHandler.name);
    }

    this.logger.info(
      { details: user.id.getValue() },
      'User retrieval successful',
    );

    return UserDtoMapper.fromEntity(user);
  }
}
