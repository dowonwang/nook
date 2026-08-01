import { Elysia } from 'elysia';

import { RefreshTokenRequired } from '$modules/auth/error';
import { UnauthorizedError } from '$shared/error';
import { getRequestMetadata } from '$shared/http';
import {
  ApiErrorResponseSchema,
  ApiResponseBuilder,
  createApiSuccessResponseSchema,
} from '$shared/responses';

import { AuthHttpModel } from './auth.http-model';
import { AuthResponseSchemas } from './auth.response';

import type {
  MeHandler,
  RefreshHandler,
  SignInHandler,
  SignOutHandler,
  SignUpHandler,
} from '$modules/auth/application';
import type { createAuthGuard } from '$modules/auth/infrastructure';

interface AuthControllerDependencies {
  signUpHandler: SignUpHandler;
  signInHandler: SignInHandler;
  meHandler: MeHandler;
  refreshHandler: RefreshHandler;
  signOutHandler: SignOutHandler;
  authGuard: ReturnType<typeof createAuthGuard>;
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
            throw new RefreshTokenRequired(createAuthController.name);
          }

          const result = await deps.refreshHandler.execute(
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
      .use(deps.authGuard)
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
