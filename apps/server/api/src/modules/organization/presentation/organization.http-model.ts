import { z } from 'zod';

export const OrganizationHttpModel = {
  create: z.object({
    title: z.string(),
  }),

  addMember: z.object({
    organizationId: z.uuidv7(),
    members: z.array(
      z.object({
        userId: z.uuidv7(),
        role: z.enum(['ADMIN', 'MAINTAINER', 'MEMBER']),
      }),
    ),
  }),
};

export type OrganizationHttpModel = {
  [K in keyof typeof OrganizationHttpModel]: z.infer<
    (typeof OrganizationHttpModel)[K]
  >;
};
