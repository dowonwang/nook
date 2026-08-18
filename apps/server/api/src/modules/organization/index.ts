import { prismaApiClient } from '@packages/api-db';

import { authGuard } from '$modules/auth';
import { PrismaUserQueryRepository } from '$modules/user/infrastructure';

import {
  CreateHandler,
  CreateInvitationHandler,
  FindSentInvitationsHandler,
} from './application';
import {
  OrganizationPolicyService,
  PrismaOrganizationCommandRepository,
  PrismaOrganizationInvitationCommandRepository,
  PrismaOrganizationQueryRepository,
} from './infrastructure';
import { PrismaOrganizationInvitationQueryRepository } from './infrastructure/repositories/prisma-organization-invitation-query.repository';
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

// module
const organizationModule = createOrganizationController({
  createHandler,
  createInvitationHandler,
  findSentInvitationsHandler,
  authGuard,
});

export default organizationModule;
