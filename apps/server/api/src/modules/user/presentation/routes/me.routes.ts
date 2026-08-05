import { Elysia } from 'elysia';

import {
  ApiErrorResponseSchema,
  ApiResponseBuilder,
  createApiSuccessResponseSchema,
} from '$shared/responses';

import { UserResponseSchema } from '../user.response';

import type { AuthGuard } from '$modules/auth';
import type { MeHandler } from '$modules/user/application';

interface Dependencies {
  meHandler: MeHandler;
  authGuard: AuthGuard;
}

export function createMeRoutes({ authGuard, meHandler }: Dependencies) {
  return new Elysia({
    name: 'user.routes.me',
  })
    .use(authGuard)
    .get(
      '/me',
      async ({ authUser }) => {
        const result = await meHandler.execute(authUser);

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
          200: createApiSuccessResponseSchema(UserResponseSchema.me),
          404: ApiErrorResponseSchema.meta({
            description: 'User not found',
          }),
        },
      },
    );
}
