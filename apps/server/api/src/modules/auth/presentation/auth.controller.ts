import { Elysia } from 'elysia';

import { authGuard } from '$modules/auth';
import { AuthResponseSchemas } from '$modules/auth/presentation/auth.response';
import { UnauthorizedError } from '$shared/error/common.error';
import { getRequestMetadata } from '$shared/http/lib/get-request-metadata';
import {
  ApiErrorResponseSchema,
  createApiSuccessResponseSchema,
} from '$shared/responses/api-response';
import { ApiResponseBuilder } from '$shared/responses/api-response-builder';

import { AuthHttpModel } from './auth.http-model';

import type { RefreshHandler } from '$modules/auth/application/commands/refresh/refresh.handler';
import type { SignInHandler } from '$modules/auth/application/commands/sign-in/sign-in.handler';
import type { SignOutHandler } from '$modules/auth/application/commands/sign-out/sign-out.handler';
import type { SignUpHandler } from '$modules/auth/application/commands/sign-up/sign-up.handler';
import type { MeHandler } from '$modules/auth/application/queries/me/me.handler';

interface AuthControllerDependencies {
  signUpHandler: SignUpHandler;
  signInHandler: SignInHandler;
  meHandler: MeHandler;
  refreshHandler: RefreshHandler;
  signOutHandler: SignOutHandler;
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
        async ({ body, request }) => {
          const metadata = getRequestMetadata(request);
          const result = await deps.signInHandler.execute(body, metadata);

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
      .post(
        '/refresh',
        async ({ request, headers }) => {
          const metadata = getRequestMetadata(request);
          const authorization = headers.authorization;

          if (!authorization) {
            throw new UnauthorizedError({
              scope: createAuthController.name,
            });
          }

          const [type, refreshToken] = authorization.split(' ');

          if (type !== 'Bearer' || !refreshToken) {
            throw new UnauthorizedError({
              scope: createAuthController.name,
            });
          }

          const result = await deps.refreshHandler.excute(
            refreshToken,
            metadata,
          );

          return ApiResponseBuilder.success(result);
        },
        {
          parse: 'application/json',
          body: AuthHttpModel.refreshBody,
          detail: {
            summary: 'Refresh Auth Token',
            security: [],
          },
          response: {
            200: createApiSuccessResponseSchema(AuthResponseSchemas.refresh),
            401: ApiErrorResponseSchema.meta({
              description: 'Invalid refreshToken',
            }),
            404: ApiErrorResponseSchema.meta({
              description: 'Session Not Found',
            }),
          },
        },
      )
      .post(
        '/sign-out',
        async ({ headers }) => {
          const authorization = headers.authorization;

          if (!authorization) {
            throw new UnauthorizedError({
              scope: createAuthController.name,
            });
          }

          const [type, refreshToken] = authorization.split(' ');

          if (type !== 'Bearer' || !refreshToken) {
            throw new UnauthorizedError({
              scope: createAuthController.name,
            });
          }

          await deps.signOutHandler.execute(refreshToken);

          return ApiResponseBuilder.success({});
        },
        {
          parse: 'application/json',
          body: AuthHttpModel.signOutBody,
          detail: {
            summary: 'Sign Out',
            security: [],
          },
          response: {
            200: createApiSuccessResponseSchema(AuthResponseSchemas.signOut),
            401: ApiErrorResponseSchema.meta({
              description: 'Invalid refreshToken',
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
