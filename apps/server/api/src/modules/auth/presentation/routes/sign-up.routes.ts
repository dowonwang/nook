import { Elysia } from 'elysia';

import {
  ApiErrorResponseSchema,
  ApiResponseBuilder,
  createApiSuccessResponseSchema,
} from '$shared/responses';

import { AuthHttpModel } from '../auth.http-model';
import { AuthResponseSchemas } from '../auth.response';

import type { SignUpHandler } from '$modules/auth/application';

interface Dependencies {
  signUpHandler: SignUpHandler;
}

export function createSignUpRoutes({ signUpHandler }: Dependencies) {
  return new Elysia({ name: 'auth.routes.sign-up' }).post(
    '/sign-up',
    async ({ body, set }) => {
      const result = await signUpHandler.execute(body);
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
}
