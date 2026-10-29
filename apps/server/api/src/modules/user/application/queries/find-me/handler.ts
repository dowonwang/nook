import { type UserCommandRepository } from '$modules/user/domain';
import { UserNotFoundError } from '$modules/user/error';
import { createLogger } from '$shared/logger';

import { FindMeQuery } from './query';
import { UserDtoMapper } from '../../mappers/user';

import type { FindMeInput } from './query';
import type { UserDetailDto } from '../../dto/detail';

export class FindMeHandler {
  private readonly logger = createLogger(FindMeHandler.name);

  constructor(private readonly userCommandRepository: UserCommandRepository) {}

  async execute(input: FindMeInput): Promise<UserDetailDto> {
    const query = new FindMeQuery(input);

    const user = await this.userCommandRepository.findById(query.id.getValue());

    if (!user) {
      throw new UserNotFoundError(FindMeHandler.name);
    }

    this.logger.info(
      { details: user.id.getValue() },
      'User retrieval successful',
    );

    return UserDtoMapper.fromEntity(user);
  }
}
