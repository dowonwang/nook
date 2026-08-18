import { Elysia } from 'elysia';

import { type AuthGuard } from '$modules/auth';
import {
  ApiErrorResponseSchema,
  ApiResponseBuilder,
  createApiSuccessResponseSchema,
} from '$shared/responses';

import { UserHttpModel } from '../user.http-model';
import { UserResponseSchema } from '../user.response';

import type { FindByEmailUserHandler } from '$modules/user/application';

interface Dependencies {
  findByEmailUserHandler: FindByEmailUserHandler;
  authGuard: AuthGuard;
}

export function createGetUserRoutes({
  authGuard,
  findByEmailUserHandler,
}: Dependencies) {
  return new Elysia({
    name: 'user.routes.get-user',
  })
    .use(authGuard)
    .get(
      '/',
      async ({ query }) => {
        const { email } = query;

        const result = await findByEmailUserHandler.execute({
          email,
        });

        return ApiResponseBuilder.success(result);
      },
      {
        query: UserHttpModel['get-user'],
        detail: {
          summary: 'Get User',
          description: 'Retrieves user information',
        },
        response: {
          200: createApiSuccessResponseSchema(UserResponseSchema['get-user']),
          422: ApiErrorResponseSchema.meta({
            description: 'Invalid query parameters',
          }),
          404: ApiErrorResponseSchema.meta({
            description: 'User not found',
          }),
        },
      },
    );
}
