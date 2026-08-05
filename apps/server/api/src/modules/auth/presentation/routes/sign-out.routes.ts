import { Elysia } from 'elysia';

import {
  ApiErrorResponseSchema,
  ApiResponseBuilder,
  createApiSuccessResponseSchema,
} from '$shared/responses';

import { AuthHttpModel } from '../auth.http-model';
import { AuthResponseSchemas } from '../auth.response';
import { refreshTokenPlugin } from '../plugins/refresh-token.plugin';

import type { SignOutHandler } from '$modules/auth/application';

interface Dependencies {
  signOutHandler: SignOutHandler;
}

export function createSignOutRoutes({ signOutHandler }: Dependencies) {
  return new Elysia({
    name: 'auth.routes.sign-out',
  })
    .use(refreshTokenPlugin)
    .post(
      '/sign-out',
      async ({ refreshToken }) => {
        await signOutHandler.execute(refreshToken);

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
    );
}
