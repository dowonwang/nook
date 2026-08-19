import { prismaApiClient } from '@packages/api-db';

import { authGuard } from '$modules/auth';

import { FindByEmailUserHandler, MeHandler } from './application';
import {
  PrismaUserCommandRepository,
  PrismaUserQueryRepository,
} from './infrastructure';
import { createUserController } from './presentation';

// repository
const userCommandRepository = new PrismaUserCommandRepository(prismaApiClient);
const userQueryRepository = new PrismaUserQueryRepository(prismaApiClient);

// handler
const meHandler = new MeHandler(userCommandRepository);
const findByEmailUserHandler = new FindByEmailUserHandler(userQueryRepository);

const userModule = createUserController({
  meHandler,
  findByEmailUserHandler,
  authGuard,
});

export default userModule;
