import { Elysia } from 'elysia';

import { offsetPaginationPlugin } from '$shared/pagination';
import {
  ApiResponseBuilder,
  createApiSuccessResponseSchema,
} from '$shared/responses';

import { OrganizationResponseSchemas } from '../organization.response';

import type { AuthGuard } from '$modules/auth';
import type { FindUserOrganizationsHandler } from '$modules/organization/application';

interface Dependencies {
  authGuard: AuthGuard;
  handler: FindUserOrganizationsHandler;
}

export function createFindUserOrganizationsRoutes({
  authGuard,
  handler,
}: Dependencies) {
  return new Elysia({ name: 'org.routes.find-user-organizations' })
    .use(authGuard)
    .use(offsetPaginationPlugin)
    .get(
      '/',
      async ({ authUser, set, pagination }) => {
        const { response, paginationResult } = await handler.execute(
          {
            userId: authUser.id,
          },
          pagination,
        );

        set.status = 200;

        return ApiResponseBuilder.success(response, {
          pagination: paginationResult,
        });
      },
      {
        detail: {
          summary: 'Find User Organizations List',
        },
        response: {
          200: createApiSuccessResponseSchema(
            OrganizationResponseSchemas['find-user-organizations'],
            'offset',
          ),
        },
      },
    );
}
