import { Elysia } from 'elysia';

import { createAuthPublicRoutes } from './routes/auth-public.routes';
import { createAuthSessionRoutes } from './routes/auth-session.routes';

import type {
  RefreshHandler,
  SignInHandler,
  SignOutHandler,
  SignUpHandler,
} from '$modules/auth/application';

interface AuthControllerDependencies {
  signUpHandler: SignUpHandler;
  signInHandler: SignInHandler;
  refreshHandler: RefreshHandler;
  signOutHandler: SignOutHandler;
}

export function createAuthController(deps: AuthControllerDependencies) {
  return new Elysia({
    name: 'auth.controller',
    prefix: '/auth',
    detail: {
      tags: ['Auth'],
    },
  })
    .use(
      createAuthPublicRoutes({
        signInHandler: deps.signInHandler,
        signUpHandler: deps.signUpHandler,
      }),
    )
    .use(
      createAuthSessionRoutes({
        refreshHandler: deps.refreshHandler,
        signOutHandler: deps.signOutHandler,
      }),
    );
}
