import { Elysia } from 'elysia';

import { requestMetadataPlugin } from '$shared/http';
import {
  ApiErrorResponseSchema,
  ApiResponseBuilder,
  createApiSuccessResponseSchema,
} from '$shared/responses';

import { AuthHttpModel } from '../http-model';
import { AuthResponseSchemas } from '../response';

import type { SignInHandler } from '$modules/auth/application';

interface Dependencies {
  signInHandler: SignInHandler;
}

export function createSignInRoutes({ signInHandler }: Dependencies) {
  return new Elysia({ name: 'auth.routes.sign-in' })
    .use(requestMetadataPlugin)
    .post(
      '/sign-in',
      async ({ body, requestMetadata }) => {
        const result = await signInHandler.execute(body, requestMetadata);

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
}
