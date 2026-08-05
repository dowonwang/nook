import { Elysia } from 'elysia';

import { createRefreshRoutes } from './routes/refresh.routes';
import { createSignInRoutes } from './routes/sign-in.routes';
import { createSignOutRoutes } from './routes/sign-out.routes';
import { createSignUpRoutes } from './routes/sign-up.routes';

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
      createSignInRoutes({
        signInHandler: deps.signInHandler,
      }),
    )
    .use(
      createSignUpRoutes({
        signUpHandler: deps.signUpHandler,
      }),
    )
    .use(
      createSignOutRoutes({
        signOutHandler: deps.signOutHandler,
      }),
    )
    .use(
      createRefreshRoutes({
        refreshHandler: deps.refreshHandler,
      }),
    );
}
