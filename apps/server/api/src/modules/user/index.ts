import { prismaApiClient } from '@packages/api-db';

import { authGuard } from '$modules/auth';

import { FindUserByEmailHandler, FindMeHandler } from './application';
import {
  PrismaUserCommandRepository,
  PrismaUserQueryRepository,
} from './infrastructure';
import { createUserController } from './presentation';

// repository
const userCommandRepository = new PrismaUserCommandRepository(prismaApiClient);
const userQueryRepository = new PrismaUserQueryRepository(prismaApiClient);

// handler
const findMeHandler = new FindMeHandler(userCommandRepository);
const findUserByEmailHandler = new FindUserByEmailHandler(userQueryRepository);

const userModule = createUserController({
  findMeHandler,
  findUserByEmailHandler,
  authGuard,
});

export default userModule;
