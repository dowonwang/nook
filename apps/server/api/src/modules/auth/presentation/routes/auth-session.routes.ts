import { Elysia } from 'elysia';

import { requestMetaDataPlugin } from '$shared/http';
import {
  ApiErrorResponseSchema,
  ApiResponseBuilder,
  createApiSuccessResponseSchema,
} from '$shared/responses';

import { AuthHttpModel } from '../auth.http-model';
import { AuthResponseSchemas } from '../auth.response';
import { refreshTokenPlugin } from '../plugins/refresh-token.plugin';

import type { RefreshHandler, SignOutHandler } from '$modules/auth/application';

interface Denpendencies {
  refreshHandler: RefreshHandler;
  signOutHandler: SignOutHandler;
}

export function createAuthSessionRoutes(deps: Denpendencies) {
  const refreshRoute = new Elysia({
    name: 'auth.routes.refresh',
  })
    .use(requestMetaDataPlugin)
    .use(refreshTokenPlugin)
    .post(
      '/refresh',
      async ({ requestMetadata, refreshToken }) => {
        const result = await deps.refreshHandler.execute(
          refreshToken,
          requestMetadata,
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
    );

  const signOutRoute = new Elysia({
    name: 'auth.routes.sign-out',
  })
    .use(refreshTokenPlugin)
    .post(
      '/sign-out',
      async ({ refreshToken }) => {
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
    );

  return new Elysia({
    name: 'auth.routes.session',
  })
    .use(signOutRoute)
    .use(refreshRoute);
}
