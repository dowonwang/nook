import { Elysia } from 'elysia';

import {
  ApiErrorResponseSchema,
  ApiResponseBuilder,
  createApiSuccessResponseSchema,
} from '$shared/responses';

import { OrganizationHttpModel } from '../organization.http-model';
import { OrganizationResponseSchemas } from '../organization.response';

import type { AuthGuard } from '$modules/auth';
import type { CreateHandler } from '$modules/organization/application';

interface Dependencies {
  createHandler: CreateHandler;
  authGuard: AuthGuard;
}

export function createOrganizationRoutes({
  authGuard,
  createHandler,
}: Dependencies) {
  return new Elysia({ name: 'org.routes.create-organization' })
    .use(authGuard)
    .post(
      '/',
      async ({ body, set, authUser }) => {
        const { id, title } = await createHandler.execute({
          userId: authUser.id,
          ...body,
        });

        set.status = 201;

        return ApiResponseBuilder.success({
          id,
          title,
        });
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
            description: 'Organization name already exists',
          }),
        },
      },
    );
}
