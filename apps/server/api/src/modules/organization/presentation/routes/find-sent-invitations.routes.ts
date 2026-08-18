import { Elysia } from 'elysia';

import { type AuthGuard } from '$modules/auth';
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
    .get(
      '/:organizationId/invitations',
      async ({ authUser, set, params: { organizationId } }) => {
        const response = await handler.execute({
          organizationId,
          userId: authUser.id,
        });

        set.status = 200;

        return ApiResponseBuilder.success(response);
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
