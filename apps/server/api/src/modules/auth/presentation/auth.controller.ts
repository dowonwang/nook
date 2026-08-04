import { Elysia } from 'elysia';

import { createAuthProtectedRoutes } from './routes/auth-protected.routes';
import { createAuthPublicRoutes } from './routes/auth-public.routes';
import { createAuthSessionRoutes } from './routes/auth-session.routes';

import type {
  MeHandler,
  RefreshHandler,
  SignInHandler,
  SignOutHandler,
  SignUpHandler,
} from '$modules/auth/application';
import type { AuthGuard } from './guard/auth.guard';

interface AuthControllerDependencies {
  signUpHandler: SignUpHandler;
  signInHandler: SignInHandler;
  meHandler: MeHandler;
  refreshHandler: RefreshHandler;
  signOutHandler: SignOutHandler;
  authGuard: AuthGuard;
}

export function createAuthController(deps: AuthControllerDependencies) {
  return new Elysia({
    name: 'auth',
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
    )
    .use(
      createAuthProtectedRoutes({
        meHandler: deps.meHandler,
        authGuard: deps.authGuard,
      }),
    );
}
