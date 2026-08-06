import { Elysia } from 'elysia';

import {
  ApiErrorResponseSchema,
  ApiResponseBuilder,
  createApiSuccessResponseSchema,
} from '$shared/responses';

import { OrganizationHttpModel } from './organization.http-model';
import { OrganizationResponseSchemas } from './organization.response';

import type { AuthGuard } from '$modules/auth';
import type {
  AddMemberHandler,
  CreateHandler,
} from '$modules/organization/application';

interface OrganizationDependencies {
  createHandler: CreateHandler;
  addMemberHandler: AddMemberHandler;
  authGuard: AuthGuard;
}

export function createOrganizationController(deps: OrganizationDependencies) {
  return (
    new Elysia({
      name: 'organization',
      prefix: '/organization',
      detail: {
        tags: ['Organization'],
      },
    })
      .use(deps.authGuard)
      // POST /organization
      .post(
        '/',
        async ({ body, set, authUser }) => {
          const { id, title } = await deps.createHandler.execute({
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
      )
      // POST /organization/add-members
      .post(
        '/add-members',
        async ({ body, set, authUser }) => {
          await deps.addMemberHandler.execute({
            userId: authUser.id,
            ...body,
          });
          set.status = 201;

          return ApiResponseBuilder.success({
            message: '멤버 추가 성공',
          });
        },
        {
          parse: 'application/json',
          body: OrganizationHttpModel.addMember,
          detail: {
            summary: 'Add Members',
          },
          response: {
            201: createApiSuccessResponseSchema(
              OrganizationResponseSchemas.addMembers,
            ),
            400: ApiErrorResponseSchema.meta({
              description: 'Invalid data or missing required fields',
            }),
            403: ApiErrorResponseSchema.meta({
              description: 'Member cannot be added to this organization',
            }),
            404: ApiErrorResponseSchema.meta({
              description: 'Organization not found',
            }),
            409: ApiErrorResponseSchema.meta({
              description: 'Member already exists in the organization',
            }),
          },
        },
      )
  );
}
