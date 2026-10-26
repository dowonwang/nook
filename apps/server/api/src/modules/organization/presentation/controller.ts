import { Elysia } from 'elysia';

import { type AuthGuard } from '$modules/auth';

import { createChangeInvitationStatusRoutes } from './routes/change-invitation-status';
import { createCreateInvitationRoutes } from './routes/create-invitation';
import { createCreateOrganizationRoutes } from './routes/create-organization';
import { createFindReceivedInvitationsRoutes } from './routes/find-received-invitations';
import { createFindSentInvitationsRoutes } from './routes/find-sent-invitations';
import { createFindUserOrganizationsRoutes } from './routes/find-user-organizations';

import type {
  ChangeInvitationStatusHandler,
  CreateOrganizationHandler,
  CreateInvitationHandler,
  FindReceivedInvitationsHandler,
  FindSentInvitationsHandler,
  FindUserOrganizationsHandler,
} from '$modules/organization/application';

interface OrganizationDependencies {
  createOrganizationHandler: CreateOrganizationHandler;
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
      createCreateOrganizationRoutes({
        authGuard: deps.authGuard,
        createOrganizationHandler: deps.createOrganizationHandler,
      }),
    )
    .use(
      createCreateInvitationRoutes({
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
      createFindReceivedInvitationsRoutes({
        authGuard: deps.authGuard,
        handler: deps.findReceivedInvitationsHandler,
      }),
    );
}
