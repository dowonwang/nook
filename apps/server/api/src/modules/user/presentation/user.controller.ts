import { Elysia } from 'elysia';

import { createGetUserRoutes } from './routes/get-user.routes';
import { createMeRoutes } from './routes/me.routes';

import type { AuthGuard } from '$modules/auth';
import type { FindByEmailUserHandler, MeHandler } from '../application';

interface UserControllerDependencies {
  meHandler: MeHandler;
  findByEmailUserHandler: FindByEmailUserHandler;
  authGuard: AuthGuard;
}

export const createUserController = (deps: UserControllerDependencies) =>
  new Elysia({
    name: 'user.controller',
    prefix: '/user',
    detail: {
      tags: ['User'],
    },
  })
    .use(
      createMeRoutes({
        authGuard: deps.authGuard,
        meHandler: deps.meHandler,
      }),
    )
    .use(
      createGetUserRoutes({
        authGuard: deps.authGuard,
        findByEmailUserHandler: deps.findByEmailUserHandler,
      }),
    );
