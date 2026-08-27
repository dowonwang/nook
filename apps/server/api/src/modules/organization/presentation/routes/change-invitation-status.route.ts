import { Elysia } from 'elysia';

import {
  ApiErrorResponseSchema,
  ApiResponseBuilder,
  createApiSuccessResponseSchema,
} from '$shared/responses';

import { OrganizationHttpModel } from '../organization.http-model';
import { OrganizationResponseSchemas } from '../organization.response';

import type { AuthGuard } from '$modules/auth';
import type { ChangeInvitationStatusHandler } from '$modules/organization/application';

interface Dependencies {
  authGuard: AuthGuard;
  handler: ChangeInvitationStatusHandler;
}

export function createChangeInvitationStatusRoutes({
  authGuard,
  handler,
}: Dependencies) {
  return new Elysia({ name: 'org.routes.change-invitation-status' })
    .use(authGuard)
    .patch(
      '/invitation',
      async ({ body, authUser, set }) => {
        await handler.execute({
          organizationInvitationId: body.invitationId,
          status: body.status,
          userId: authUser.id,
        });

        set.status = 200;

        return ApiResponseBuilder.success(null);
      },
      {
        parse: 'application/json',
        body: OrganizationHttpModel['change-invitation-status'],
        detail: {
          summary: 'Change Organization Invitation Status',
        },
        response: {
          200: createApiSuccessResponseSchema(
            OrganizationResponseSchemas['change-invitation-status'],
          ),
          422: ApiErrorResponseSchema.meta({
            description: 'Invalid data',
          }),
          404: ApiErrorResponseSchema.meta({
            description: 'Invalid data or missing required fields',
          }),
          403: ApiErrorResponseSchema.meta({
            description: 'Wrong Invitee or Invited User',
          }),
        },
      },
    );
}
