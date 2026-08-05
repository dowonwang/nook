import { Elysia } from 'elysia';

import { createMeRoutes } from './routes/me.routes';

import type { AuthGuard } from '$modules/auth';
import type { MeHandler } from '../application';

interface UserControllerDependencies {
  meHandler: MeHandler;
  authGuard: AuthGuard;
}

export const createUserController = (deps: UserControllerDependencies) =>
  new Elysia({
    name: 'user.controller',
    prefix: '/user',
    detail: {
      tags: ['User'],
    },
  }).use(
    createMeRoutes({
      authGuard: deps.authGuard,
      meHandler: deps.meHandler,
    }),
  );
