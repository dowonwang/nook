import { Elysia } from 'elysia';

import { requestMetaDataPlugin } from '$shared/http';
import {
  ApiErrorResponseSchema,
  ApiResponseBuilder,
  createApiSuccessResponseSchema,
} from '$shared/responses';

import { AuthHttpModel } from '../auth.http-model';
import { AuthResponseSchemas } from '../auth.response';

import type { SignInHandler, SignUpHandler } from '$modules/auth/application';

interface Denpendencies {
  signInHandler: SignInHandler;
  signUpHandler: SignUpHandler;
}

export function createAuthPublicRoutes(deps: Denpendencies) {
  const signInRoute = new Elysia({ name: 'auth.routes.sign-in' })
    .use(requestMetaDataPlugin)
    .post(
      '/sign-in',
      async ({ body, requestMetadata }) => {
        const result = await deps.signInHandler.execute(body, requestMetadata);

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
    );

  const signUpRoute = new Elysia({ name: 'auth.routes.sign-up' }).post(
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
  );

  return new Elysia({
    name: 'auth.routes.public',
  })
    .use(signInRoute)
    .use(signUpRoute);
}
