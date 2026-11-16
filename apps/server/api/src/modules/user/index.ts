import { prismaApiClient } from '@packages/api-db';

import { authGuard } from '$modules/auth';

import { FindMeHandler } from './application';
import { PrismaUserCommandRepository } from './infrastructure';
import { createUserController } from './presentation';

// repository
const userCommandRepository = new PrismaUserCommandRepository(prismaApiClient);

// handler
const findMeHandler = new FindMeHandler(userCommandRepository);

const userModule = createUserController({
  findMeHandler,
  authGuard,
});

export default userModule;
