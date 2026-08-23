import { prismaApiClient } from '@packages/api-db';

import { authGuard } from '$modules/auth';
import { PrismaUserQueryRepository } from '$modules/user/infrastructure';

import {
  CreateHandler,
  CreateInvitationHandler,
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

// module
const organizationModule = createOrganizationController({
  createHandler,
  createInvitationHandler,
  findSentInvitationsHandler,
  findUserOrganizationsHandler,
  authGuard,
});

export default organizationModule;
