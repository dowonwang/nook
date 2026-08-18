import { UserNotFound } from '$modules/user/error';
import { createLogger } from '$shared/logger';

import { FindByEmailUserQuery } from './find-user.query';
import { UserDtoMapper } from '../../mapper/user-dto.mapper';

import type { UserQueryRepository } from '$modules/user/domain';
import type { FindByEmailUserInput } from './find-user.query';

export class FindByEmailUserHandler {
  private readonly logger = createLogger(FindByEmailUserHandler.name);

  constructor(private readonly userQueryRepository: UserQueryRepository) {}

  async execute(input: FindByEmailUserInput) {
    const query = new FindByEmailUserQuery(input);
    const user = await this.userQueryRepository.findByEmail(query.email);

    if (!user) {
      throw new UserNotFound(FindByEmailUserHandler.name);
    }

    this.logger.debug(
      { details: user.id.getValue() },
      'User search successful',
    );

    return UserDtoMapper.fromEntity(user);
  }
}
