import { prismaApiClient } from '@packages/api-db';

import { MeHandler } from './application';
import { PrismaUserCommandRepository } from './infrastructure';
import { createUserController } from './presentation';

// repository
const userCommandRepository = new PrismaUserCommandRepository(prismaApiClient);

// handler
const meHandler = new MeHandler(userCommandRepository);

const userModule = createUserController({
  meHandler,
});

export default userModule;
