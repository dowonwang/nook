import { prismaApiClient } from '@packages/api-db';

import { authGuard } from '$modules/auth';

import { AddMemberHandler, CreateHandler } from './application';
import {
  OrganizationPolicyService,
  PrismaOrganizationCommandRepository,
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

// service
const orgainzationPolicy = new OrganizationPolicyService(
  organizationQueryRepository,
);

// handler
const createHandler = new CreateHandler(
  orgainzationPolicy,
  organizationCommandRepository,
);
const addMemberHandler = new AddMemberHandler(organizationCommandRepository);

// module
const organizationModule = createOrganizationController({
  createHandler,
  addMemberHandler,
  authGuard,
});

export default organizationModule;
