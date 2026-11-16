import { Elysia } from 'elysia';

import { createFindMeRoutes } from './routes/find-me';

import type { AuthGuard } from '$modules/auth';
import type { FindMeHandler } from '$modules/user/application';

interface UserControllerDependencies {
  findMeHandler: FindMeHandler;
  authGuard: AuthGuard;
}

export function createUserController(deps: UserControllerDependencies) {
  return new Elysia({
    name: 'user.controller',
    prefix: '/user',
    detail: {
      tags: ['User'],
    },
  }).use(
    createFindMeRoutes({
      authGuard: deps.authGuard,
      findMeHandler: deps.findMeHandler,
    }),
  );
}
