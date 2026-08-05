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

import type { RefreshHandler } from '$modules/auth/application';

interface Dependencies {
  refreshHandler: RefreshHandler;
}

export function createRefreshRoutes({ refreshHandler }: Dependencies) {
  return new Elysia({
    name: 'auth.routes.refresh',
  })
    .use(requestMetaDataPlugin)
    .use(refreshTokenPlugin)
    .post(
      '/refresh',
      async ({ requestMetadata, refreshToken }) => {
        const result = await refreshHandler.execute(
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
}
