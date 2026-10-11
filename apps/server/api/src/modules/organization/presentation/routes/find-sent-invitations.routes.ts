import { Elysia } from 'elysia';

import { type AuthGuard } from '$modules/auth';
import { offsetPaginationPlugin } from '$shared/pagination';
import {
  ApiResponseBuilder,
  createApiSuccessResponseSchema,
} from '$shared/responses';

import { OrganizationResponseSchemas } from '../organization.response';

import type { FindSentInvitationsHandler } from '$modules/organization/application';

interface Dependencies {
  handler: FindSentInvitationsHandler;
  authGuard: AuthGuard;
}

export function createFindSentInvitationsRoutes({
  authGuard,
  handler,
}: Dependencies) {
  return new Elysia({ name: 'org.routes.find-sent-invitations' })
    .use(authGuard)
    .use(offsetPaginationPlugin)
    .get(
      '/:organizationId/invitations',
      async ({ authUser, set, params: { organizationId }, pagination }) => {
        const { response, paginationResult } = await handler.execute(
          {
            organizationId,
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
          summary: 'Find Sent Invitations',
        },
        response: {
          200: createApiSuccessResponseSchema(
            OrganizationResponseSchemas['find-sent-invitations'],
          ),
        },
      },
    );
}
