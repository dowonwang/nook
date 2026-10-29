import { Elysia } from 'elysia';

import { type AuthGuard } from '$modules/auth';
import {
  ApiErrorResponseSchema,
  ApiResponseBuilder,
  createApiSuccessResponseSchema,
} from '$shared/responses';

import { UserHttpModel } from '../http-model';
import { UserResponseSchemas } from '../response';

import type { FindUserByEmailHandler } from '$modules/user/application';

interface Dependencies {
  findUserByEmailHandler: FindUserByEmailHandler;
  authGuard: AuthGuard;
}

export function createFindUserByEmailRoutes({
  authGuard,
  findUserByEmailHandler,
}: Dependencies) {
  return new Elysia({
    name: 'user.routes.get-user',
  })
    .use(authGuard)
    .get(
      '/',
      async ({ query }) => {
        const { email } = query;

        const result = await findUserByEmailHandler.execute({
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
          200: createApiSuccessResponseSchema(UserResponseSchemas['get-user']),
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
