import { Elysia } from 'elysia';

import { type AuthGuard } from '$modules/auth';

import { createChangeInvitationStatusRoutes } from './routes/change-invitation-status.route';
import { createInvitationRoutes } from './routes/create-invitation.routes';
import { createOrganizationRoutes } from './routes/create-organization.routes';
import { createFindReceivedInvitations } from './routes/find-received-invitations.routes';
import { createFindSentInvitationsRoutes } from './routes/find-sent-invitations.routes';
import { createFindUserOrganizationsRoutes } from './routes/find-user-organization.routes';

import type {
  ChangeInvitationStatusHandler,
  CreateHandler,
  CreateInvitationHandler,
  FindReceivedInvitationsHandler,
  FindSentInvitationsHandler,
  FindUserOrganizationsHandler,
} from '$modules/organization/application';

interface OrganizationDependencies {
  createHandler: CreateHandler;
  createInvitationHandler: CreateInvitationHandler;
  findSentInvitationsHandler: FindSentInvitationsHandler;
  findUserOrganizationsHandler: FindUserOrganizationsHandler;
  changeInvitationStatusHandler: ChangeInvitationStatusHandler;
  findReceivedInvitationsHandler: FindReceivedInvitationsHandler;
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
    )
    .use(
      createFindUserOrganizationsRoutes({
        authGuard: deps.authGuard,
        handler: deps.findUserOrganizationsHandler,
      }),
    )
    .use(
      createChangeInvitationStatusRoutes({
        authGuard: deps.authGuard,
        handler: deps.changeInvitationStatusHandler,
      }),
    )
    .use(
      createFindReceivedInvitations({
        authGuard: deps.authGuard,
        handler: deps.findReceivedInvitationsHandler,
      }),
    );
}
