import { Elysia } from 'elysia';

import {
  ApiErrorResponseSchema,
  ApiResponseBuilder,
  createApiSuccessResponseSchema,
} from '$shared/responses';

import { OrganizationResponseSchemas } from '../response';

import type { AuthGuard } from '$modules/auth';
import type { FindOrganizationBySlugHandler } from '$modules/organization/application';

interface Dependencies {
  authGuard: AuthGuard;
  handler: FindOrganizationBySlugHandler;
}

export function createFindOrganizationBySlugRoutes({
  authGuard,
  handler,
}: Dependencies) {
  return new Elysia({ name: 'org.routes.find-organization-by-slug' })
    .use(authGuard)
    .get(
      '/slug/:slug',
      async ({ authUser, params: { slug } }) => {
        const result = await handler.execute({
          userId: authUser.id,
          slug,
        });

        return ApiResponseBuilder.success(result);
      },
      {
        detail: {
          summary: 'Find Organization By Slug',
        },
        response: {
          200: createApiSuccessResponseSchema(
            OrganizationResponseSchemas['find-organization-by-slug'],
          ),
          404: ApiErrorResponseSchema.meta({
            description: 'Organization not found or not a member',
          }),
        },
      },
    );
}
