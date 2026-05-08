import { prismaApiClient } from '@packages/api-db';

import { AddMemberHandler } from './application/commands/add-member/add-member.handler';
import { CreateHandler } from './application/commands/create/create.handler';
import { PrismaOrganizationCommandRepository } from './infrastructure/repositories/prisma-organization-command.repository';
import { PrismaOrganizationQueryRepository } from './infrastructure/repositories/prisma-organization-query.repository';
import { OrganizationPolicyService } from './infrastructure/services/organization-policy-service';
import { createOrganizationController } from './presentation/organization.controller';

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
});

export default organizationModule;
