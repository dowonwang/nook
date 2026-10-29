import { prismaApiClient } from '@packages/api-db';

import { authGuard } from '$modules/auth';
import { PrismaUserQueryRepository } from '$modules/user/infrastructure';
import { PrismaTransactionManager } from '$shared/database';

import {
  ChangeInvitationStatusHandler,
  CreateOrganizationHandler,
  CreateInvitationHandler,
  FindOrganizationBySlugHandler,
  FindReceivedInvitationsHandler,
  FindSentInvitationsHandler,
  FindUserOrganizationsHandler,
} from './application';
import {
  PrismaOrganizationCommandRepository,
  PrismaOrganizationInvitationCommandRepository,
  PrismaOrganizationInvitationQueryRepository,
  PrismaOrganizationQueryRepository,
} from './infrastructure';
import { createOrganizationController } from './presentation';

// repository
const organizationCommandRepository = new PrismaOrganizationCommandRepository(
  prismaApiClient,
);
const organizationQueryRepository = new PrismaOrganizationQueryRepository(
  prismaApiClient,
);
const organizationInvitationCommandRepository =
  new PrismaOrganizationInvitationCommandRepository(prismaApiClient);
const organizationInvitationQueryRepository =
  new PrismaOrganizationInvitationQueryRepository(prismaApiClient);
const userQueryRepository = new PrismaUserQueryRepository(prismaApiClient);

// service
const transactionManager = new PrismaTransactionManager(prismaApiClient);

// handler
const createOrganizationHandler = new CreateOrganizationHandler(
  organizationCommandRepository,
);
const createInvitationHandler = new CreateInvitationHandler(
  organizationCommandRepository,
  organizationInvitationCommandRepository,
  userQueryRepository,
);
const findSentInvitationsHandler = new FindSentInvitationsHandler(
  organizationCommandRepository,
  organizationInvitationQueryRepository,
  userQueryRepository,
);
const findUserOrganizationsHandler = new FindUserOrganizationsHandler(
  organizationQueryRepository,
);
const changeInvitationStatusHandler = new ChangeInvitationStatusHandler(
  organizationInvitationCommandRepository,
  organizationCommandRepository,
  transactionManager,
);
const findReceivedInvitationsHandler = new FindReceivedInvitationsHandler(
  organizationInvitationQueryRepository,
  organizationQueryRepository,
  userQueryRepository,
);
const findOrganizationBySlugHandler = new FindOrganizationBySlugHandler(
  organizationQueryRepository,
);

// module
const organizationModule = createOrganizationController({
  authGuard,
  createOrganizationHandler,
  createInvitationHandler,
  findSentInvitationsHandler,
  findUserOrganizationsHandler,
  changeInvitationStatusHandler,
  findReceivedInvitationsHandler,
  findOrganizationBySlugHandler,
});

export default organizationModule;
