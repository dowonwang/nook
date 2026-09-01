import { prismaApiClient } from '@packages/api-db';

import { authGuard } from '$modules/auth';
import { PrismaUserQueryRepository } from '$modules/user/infrastructure';
import { PrismaTransactionManager } from '$shared/database';

import {
  ChangeInvitationStatusHandler,
  CreateHandler,
  CreateInvitationHandler,
  FindReceivedInvitationsHandler,
  FindSentInvitationsHandler,
  FindUserOrganizationsHandler,
} from './application';
import {
  OrganizationPolicyService,
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
const organizationPolicy = new OrganizationPolicyService(
  organizationQueryRepository,
);
const transactionManager = new PrismaTransactionManager(prismaApiClient);

// handler
const createHandler = new CreateHandler(
  organizationPolicy,
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

// module
const organizationModule = createOrganizationController({
  authGuard,
  createHandler,
  createInvitationHandler,
  findSentInvitationsHandler,
  findUserOrganizationsHandler,
  changeInvitationStatusHandler,
  findReceivedInvitationsHandler,
});

export default organizationModule;
