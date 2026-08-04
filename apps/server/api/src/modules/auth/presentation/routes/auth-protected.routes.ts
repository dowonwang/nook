import { Elysia } from 'elysia';

import {
  ApiErrorResponseSchema,
  ApiResponseBuilder,
  createApiSuccessResponseSchema,
} from '$shared/responses';

import { AuthResponseSchemas } from '../auth.response';

import type { AuthGuard } from '$modules/auth';
import type { MeHandler } from '$modules/auth/application';

interface Denpendencies {
  meHandler: MeHandler;
  authGuard: AuthGuard;
}

export function createAuthProtectedRoutes(deps: Denpendencies) {
  const meRoute = new Elysia({ name: 'auth.routes.me' })
    .use(deps.authGuard)
    .get(
      '/me',
      async ({ authUser }) => {
        const result = await deps.meHandler.execute(authUser);

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
    );

  return new Elysia({ name: 'auth.routes.protected' }).use(meRoute);
}
