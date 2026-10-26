import { Elysia } from 'elysia';

import {
  ApiErrorResponseSchema,
  ApiResponseBuilder,
  createApiSuccessResponseSchema,
} from '$shared/responses';

import { UserResponseSchemas } from '../response';

import type { AuthGuard } from '$modules/auth';
import type { FindMeHandler } from '$modules/user/application';

interface Dependencies {
  findMeHandler: FindMeHandler;
  authGuard: AuthGuard;
}

export function createFindMeRoutes({ authGuard, findMeHandler }: Dependencies) {
  return new Elysia({
    name: 'user.routes.me',
  })
    .use(authGuard)
    .get(
      '/me',
      async ({ authUser }) => {
        const result = await findMeHandler.execute(authUser);

        return ApiResponseBuilder.success(result);
      },
      {
        detail: {
          summary: 'Get Current User',
          description:
            'Retrieves the profile information of the currently authenticated user.',
        },
        response: {
          200: createApiSuccessResponseSchema(UserResponseSchemas.me),
          404: ApiErrorResponseSchema.meta({
            description: 'User not found',
          }),
        },
      },
    );
}
