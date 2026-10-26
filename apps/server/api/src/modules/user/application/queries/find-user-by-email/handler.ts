import { UserNotFoundError } from '$modules/user/error';
import { createLogger } from '$shared/logger';

import { FindUserByEmailQuery } from './query';
import { UserDtoMapper } from '../../mappers/user';

import type { UserQueryRepository } from '$modules/user/domain';
import type { FindUserByEmailInput } from './query';

export class FindUserByEmailHandler {
  private readonly logger = createLogger(FindUserByEmailHandler.name);

  constructor(private readonly userQueryRepository: UserQueryRepository) {}

  async execute(input: FindUserByEmailInput) {
    const query = new FindUserByEmailQuery(input);
    const user = await this.userQueryRepository.findByEmail(query.email);

    if (!user) {
      throw new UserNotFoundError(FindUserByEmailHandler.name);
    }

    this.logger.debug(
      { details: user.id.getValue() },
      'User search successful',
    );

    return UserDtoMapper.fromEntity(user);
  }
}
