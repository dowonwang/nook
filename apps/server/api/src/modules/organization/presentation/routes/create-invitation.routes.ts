import { Elysia } from 'elysia';

import {
  ApiErrorResponseSchema,
  ApiResponseBuilder,
  createApiSuccessResponseSchema,
} from '$shared/responses';

import { OrganizationHttpModel } from '../organization.http-model';
import { OrganizationResponseSchemas } from '../organization.response';

import type { AuthGuard } from '$modules/auth';
import type { CreateInvitationHandler } from '$modules/organization/application';

interface Dependencies {
  authGuard: AuthGuard;
  createInvitationHandler: CreateInvitationHandler;
}

export function createInvitationRoutes({
  authGuard,
  createInvitationHandler,
}: Dependencies) {
  return new Elysia({ name: 'org.routes.create-invitation' })
    .use(authGuard)
    .post(
      '/:organizationId/invitations',
      async ({ body, set, authUser, params: { organizationId } }) => {
        await createInvitationHandler.execute({
          organizationId,
          inviterUserId: authUser.id,
          invitee: body,
        });

        set.status = 201;

        return ApiResponseBuilder.success(null);
      },
      {
        parse: 'application/json',
        body: OrganizationHttpModel['create-invitation'],
        detail: {
          summary: 'Create Invitation',
        },
        response: {
          201: createApiSuccessResponseSchema(
            OrganizationResponseSchemas['create-invitation'],
          ),
          404: ApiErrorResponseSchema.meta({
            description: 'Invalid data or missing required fields',
          }),
          422: ApiErrorResponseSchema.meta({
            description: 'Invalid data',
          }),
          409: ApiErrorResponseSchema.meta({
            description: 'Invitee is wrong',
          }),
        },
      },
    );
}
