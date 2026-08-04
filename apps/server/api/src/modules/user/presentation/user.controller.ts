import { Elysia } from 'elysia';

import { createMeRoutes } from './routes/me.routes';

import type { MeHandler } from '../application';

interface UserControllerDependencies {
  meHandler: MeHandler;
}

export const createUserController = (deps: UserControllerDependencies) =>
  new Elysia({
    name: 'user.controller',
    prefix: '/user',
    detail: {
      tags: ['User'],
    },
  }).use(createMeRoutes(deps.meHandler));
