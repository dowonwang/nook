import { Elysia } from 'elysia';

import { offsetPaginationPlugin } from '$shared/pagination';
import {
  ApiResponseBuilder,
  createApiSuccessResponseSchema,
} from '$shared/responses';

import { OrganizationResponseSchemas } from '../response';

import type { AuthGuard } from '$modules/auth';
import type { FindReceivedInvitationsHandler } from '$modules/organization/application';

interface Dependencies {
  handler: FindReceivedInvitationsHandler;
  authGuard: AuthGuard;
}

export function createFindReceivedInvitationsRoutes({
  authGuard,
  handler,
}: Dependencies) {
  return new Elysia({ name: 'org.routes.find-received-invitations' })
    .use(authGuard)
    .use(offsetPaginationPlugin)
    .get(
      '/invitations',
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
          summary: 'Find Received Invitations',
        },
        response: {
          200: createApiSuccessResponseSchema(
            OrganizationResponseSchemas['find-received-invitations'],
            'offset',
          ),
        },
      },
    );
}
