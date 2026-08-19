import { Elysia } from 'elysia';

import { createInvitationRoutes } from './routes/create-invitation.routes';
import { createOrganizationRoutes } from './routes/create-organization.routes';
import { createFindSentInvitationsRoutes } from './routes/find-sent-invitations.routes';

import type { AuthGuard } from '$modules/auth';
import type {
  CreateHandler,
  CreateInvitationHandler,
  FindSentInvitationsHandler,
} from '$modules/organization/application';

interface OrganizationDependencies {
  createHandler: CreateHandler;
  createInvitationHandler: CreateInvitationHandler;
  findSentInvitationsHandler: FindSentInvitationsHandler;
  authGuard: AuthGuard;
}

export function createOrganizationController(deps: OrganizationDependencies) {
  return new Elysia({
    name: 'organization',
    prefix: '/organization',
    detail: {
      tags: ['Organization'],
    },
  })
    .use(
      createOrganizationRoutes({
        authGuard: deps.authGuard,
        createHandler: deps.createHandler,
      }),
    )
    .use(
      createInvitationRoutes({
        authGuard: deps.authGuard,
        createInvitationHandler: deps.createInvitationHandler,
      }),
    )
    .use(
      createFindSentInvitationsRoutes({
        authGuard: deps.authGuard,
        handler: deps.findSentInvitationsHandler,
      }),
    );
}
