import { Elysia } from 'elysia';

import { authGuard } from '$modules/auth';
import { AuthResponseSchemas } from '$modules/auth/presentation/auth.response';
import { errorPlugin } from '$shared/http/plugin/error.plugin';
import {
  ApiErrorResponseSchema,
  createApiSuccessResponseSchema,
} from '$shared/responses/api-response';
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
      // POST /auth/sign-up
      .post(
        '/sign-up',
        async ({ body, set }) => {
          const result = await deps.signUpHandler.execute(body);
          set.status = 201;

          return ApiResponseBuilder.success(result);
        },
        {
          parse: 'application/json',
          body: AuthHttpModel.signUpBody,
          detail: {
            summary: 'Sign Up User',
            security: [],
          },
          response: {
            201: createApiSuccessResponseSchema(AuthResponseSchemas.signUp),
            400: ApiErrorResponseSchema.meta({
              description: 'Invalid input or missing required fields',
            }),
            409: ApiErrorResponseSchema.meta({
              description: 'User already exists',
            }),
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
          parse: 'application/json',
          body: AuthHttpModel.signInBody,
          detail: {
            summary: 'Sign In User',
            security: [],
          },
          response: {
            200: createApiSuccessResponseSchema(AuthResponseSchemas.signIn),
            400: ApiErrorResponseSchema.meta({
              description: 'Invalid input or missing required fields',
            }),
            401: ApiErrorResponseSchema.meta({
              description: 'Invalid username or password',
            }),
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
          parse: 'application/json',
          detail: {
            summary: 'Get Current User',
            description:
              'Retrieves the profile information of the currently authenticated user.',
          },
          response: {
            200: createApiSuccessResponseSchema(AuthResponseSchemas.me),
            404: ApiErrorResponseSchema.meta({
              description: 'User not found',
            }),
          },
        },
      )
  );
}
