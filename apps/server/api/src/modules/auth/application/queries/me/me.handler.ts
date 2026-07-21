import { UserDtoMapper } from '$modules/user/application/mapper/user-dto.mapper';
import { UserUuid } from '$modules/user/domain/value-objects/uuid.vo';
import { UserNotFound } from '$modules/user/error/user-not-found.error';
import { createLogger } from '$shared/logger';

import type { UserDetailDto } from '$modules/user/application/dto/user-detail.dto';
import type { UserQueryRepository } from '$modules/user/domain/repositories/user-query.repository';
import type { MeQuery } from './me.query';

export class MeHandler {
  constructor(private readonly userQueryRepository: UserQueryRepository) {}

  async excute(query: MeQuery): Promise<UserDetailDto> {
    const id = UserUuid.create(query.id);

    const user = await this.userQueryRepository.findById(id.getValue());

    if (!user) {
      throw new UserNotFound(MeHandler.name);
    }

    logger.info({ details: user.id.getValue() }, 'User retrieval successful');

    return UserDtoMapper.fromEntity(user);
  }
}

const logger = createLogger(MeHandler.name);
