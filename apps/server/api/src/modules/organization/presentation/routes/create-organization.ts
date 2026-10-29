import { Elysia } from 'elysia';

import {
  ApiErrorResponseSchema,
  ApiResponseBuilder,
  createApiSuccessResponseSchema,
} from '$shared/responses';

import { OrganizationHttpModel } from '../http-model';
import { OrganizationResponseSchemas } from '../response';

import type { AuthGuard } from '$modules/auth';
import type { CreateOrganizationHandler } from '$modules/organization/application';

interface Dependencies {
  createOrganizationHandler: CreateOrganizationHandler;
  authGuard: AuthGuard;
}

export function createCreateOrganizationRoutes({
  authGuard,
  createOrganizationHandler,
}: Dependencies) {
  return new Elysia({ name: 'org.routes.create-organization' })
    .use(authGuard)
    .post(
      '/',
      async ({ body, set, authUser }) => {
        const result = await createOrganizationHandler.execute({
          userId: authUser.id,
          ...body,
        });

        set.status = 201;

        return ApiResponseBuilder.success(result);
      },
      {
        parse: 'application/json',
        body: OrganizationHttpModel.create,
        detail: {
          summary: 'Create Organization',
        },
        response: {
          201: createApiSuccessResponseSchema(
            OrganizationResponseSchemas.create,
          ),
          404: ApiErrorResponseSchema.meta({
            description: 'Invalid data or missing required fields',
          }),
          409: ApiErrorResponseSchema.meta({
            description: 'Failed to generate a unique organization slug',
          }),
        },
      },
    );
}
