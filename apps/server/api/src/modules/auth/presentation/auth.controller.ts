import { Elysia } from 'elysia';

import { authGuard } from '$modules/auth';
import { errorPlugin } from '$shared/http/plugin/error.plugin';
import { ApiResponseBuilder } from '$shared/responses/api-response-builder';

import { AuthHttpModel } from './auth.http-model';

import type { SignInHandler } from '$modules/auth/application/commands/sign-in/sign-in.handler';
import type { SignUpHandler } from '$modules/auth/application/commands/sign-up/sign-up.handler';
import type { MeHandler } from '$modules/auth/application/queries/me/me.handler';

interface AuthControllerDependencies {
  signUpHandler: SignUpHandler;
  signInHandler: SignInHandler;
  meHandler: MeHandler;
}

export function createAuthController(deps: AuthControllerDependencies) {
  return (
    new Elysia({
      name: 'auth',
      prefix: '/auth',
      detail: {
        tags: ['Auth'],
      },
    })
      .use(errorPlugin)
      .model(AuthHttpModel)
      // POST /auth/sign-up
      .post(
        '/sign-up',
        async ({ body, set }) => {
          const result = await deps.signUpHandler.execute(body);
          set.status = 201;

          return ApiResponseBuilder.success(result);
        },
        {
          body: 'signUpBody',
          detail: {
            summary: 'Sign Up User',
          },
        },
      )
      // POST /auth/sign-in
      .post(
        '/sign-in',
        async ({ body }) => {
          const result = await deps.signInHandler.excute(body);

          return ApiResponseBuilder.success(result);
        },
        {
          body: 'signInBody',
          detail: {
            summary: 'Sign In User',
          },
        },
      )
      // 액세스 토큰 검증 필요 라우터
      .use(authGuard)
      // GET /auth/me
      .get(
        '/me',
        async ({ authUser }) => {
          const result = await deps.meHandler.excute(authUser);

          return ApiResponseBuilder.success(result);
        },
        {
          detail: {
            summary: 'Get Current User',
          },
        },
      )
  );
}
