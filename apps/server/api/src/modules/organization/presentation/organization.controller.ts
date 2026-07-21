import { Elysia } from 'elysia';

import { authGuard } from '$modules/auth';
import { OrganizationHttpModel } from '$modules/organization/presentation/organization.http-model';
import { OrganizationResponseSchemas } from '$modules/organization/presentation/organization.response';
import {
  ApiErrorResponseSchema,
  createApiSuccessResponseSchema,
} from '$shared/responses/api-response';
import { ApiResponseBuilder } from '$shared/responses/api-response-builder';

import type { AddMemberHandler } from '$modules/organization/application/commands/add-member/add-member.handler';
import type { CreateHandler } from '$modules/organization/application/commands/create/create.handler';

interface OrganizationDependencies {
  createHandler: CreateHandler;
  addMemberHandler: AddMemberHandler;
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
      .use(authGuard)
      // POST /organization
      .post(
        '/',
        async ({ body, set, authUser }) => {
          await deps.createHandler.execute({
            userId: authUser.id,
            ...body,
          });
          set.status = 201;

          return ApiResponseBuilder.success({
            message: 'Organization create success',
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
