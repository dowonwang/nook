import { Elysia } from 'elysia';

import { createFindMeRoutes } from './routes/find-me';
import { createFindUserByEmailRoutes } from './routes/find-user-by-email';

import type { AuthGuard } from '$modules/auth';
import type {
  FindMeHandler,
  FindUserByEmailHandler,
} from '$modules/user/application';

interface UserControllerDependencies {
  findMeHandler: FindMeHandler;
  findUserByEmailHandler: FindUserByEmailHandler;
  authGuard: AuthGuard;
}

export function createUserController(deps: UserControllerDependencies) {
  return new Elysia({
    name: 'user.controller',
    prefix: '/user',
    detail: {
      tags: ['User'],
    },
  })
    .use(
      createFindMeRoutes({
        authGuard: deps.authGuard,
        findMeHandler: deps.findMeHandler,
      }),
    )
    .use(
      createFindUserByEmailRoutes({
        authGuard: deps.authGuard,
        findUserByEmailHandler: deps.findUserByEmailHandler,
      }),
    );
}
