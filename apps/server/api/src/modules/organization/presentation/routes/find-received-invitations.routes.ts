import { Elysia } from 'elysia';

import {
  ApiResponseBuilder,
  createApiSuccessResponseSchema,
} from '$shared/responses';

import { OrganizationResponseSchemas } from '../organization.response';

import type { AuthGuard } from '$modules/auth';
import type { FindReceivedInvitationsHandler } from '$modules/organization/application';

interface Dependencies {
  handler: FindReceivedInvitationsHandler;
  authGuard: AuthGuard;
}

export function createFindReceivedInvitations({
  authGuard,
  handler,
}: Dependencies) {
  return new Elysia({ name: 'org.routes.find-received-invitations' })
    .use(authGuard)
    .get(
      '/invitations',
      async ({ authUser, set }) => {
        const response = await handler.execute({
          userId: authUser.id,
        });

        set.status = 200;

        return ApiResponseBuilder.success(response);
      },
      {
        detail: {
          summary: 'Find Received Invitations',
        },
        response: {
          200: createApiSuccessResponseSchema(
            OrganizationResponseSchemas['find-received-invitations'],
          ),
        },
      },
    );
}
