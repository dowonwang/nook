import { UserUuid, type UserCommandRepository } from '$modules/user/domain';
import { UserNotFound } from '$modules/user/error';
import { createLogger } from '$shared/logger';

import { UserDtoMapper } from '../../mapper/user-dto.mapper';

import type { MeCommand } from './me.commands';
import type { UserDetailDto } from '../../dto/user-detail.dto';

export class MeHandler {
  private readonly logger = createLogger(MeHandler.name);

  constructor(private readonly userCommandRepository: UserCommandRepository) {}

  async execute(command: MeCommand): Promise<UserDetailDto> {
    const id = UserUuid.create(command.id);

    const user = await this.userCommandRepository.findById(id.getValue());

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
