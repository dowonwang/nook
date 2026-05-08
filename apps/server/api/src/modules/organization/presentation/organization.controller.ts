import { Elysia } from 'elysia';

import { authGuard } from '$modules/auth';
import { OrganizationHttpModel } from '$modules/organization/presentation/organization.http-model';
import { errorPlugin } from '$shared/http/plugin/error.plugin';
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
      .use(errorPlugin)
      .use(authGuard)
      .model(OrganizationHttpModel)
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
          body: 'create',
          detail: {
            summary: 'Create Organization',
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
          body: 'addMember',
          detail: {
            summary: 'Add Members',
          },
        },
      )
  );
}
